import { extendType, inputObjectType, intArg, nonNull, nullable, objectType, stringArg } from "nexus";

export const Plant = objectType({
  name: 'Plant',
  definition(t) {
    t.nonNull.int('id', { description: 'Plant identification number'})
    t.nonNull.string('name', {description: 'Plant name'})
    t.nullable.string('description', {description: 'Plant description'})
    t.nonNull.field('created_at', { type: "dateTime", description: 'Last update timestamp' })
    t.nonNull.field('updated_at', { type: "dateTime", description: 'Last update timestamp' })
    t.nullable.string('greenhouseId', {description: 'Greenhouse ID'})
  },
})

export const PlantInput = inputObjectType({
  name: "PlantInput",
  definition(t) {
    t.nonNull.string('name')
    t.string('description')
  }
})

export const PlantQuery = extendType({
  type: 'Query',
  definition(t) {
    // List all greenhouses
    t.list.nonNull.field('plants', {
      type: 'Plant',
      description: 'List of all plants contained in one greenhouse',
      resolve(_, args, context) {
        return context.prisma.plant.findMany();
      },
    });

    // Create new plant
    t.field('addPlant', {
      type: 'Plant',
      description: 'Add plant to a greenhouses',
      args: {
        greenhouseId: nonNull(stringArg({
          description: 'Greenhouse ID'
        })),
        name: nonNull(stringArg({
          description: "Plant's name"
        })),
        description: nullable(stringArg({
          description: "Plant's description"
        }))
      },
      resolve(_, args, context) {
        return context.prisma.plant.create({
          data: {
            name: args.name,
            description: args.description,
            greenhouseId: args.greenhouseId,
          }
        })
      }
    });

    // Update plant
    t.field('updatePlant', {
      type: 'Plant',
      description: 'Update a plant information',
      args: {
        id: nonNull(intArg({
          description: 'Plant ID'
        })),
        name: nonNull(stringArg({
          description: "Plant's name"
        })),
        description: nullable(stringArg({
          description: "Plant's description"
        }))
      },
      resolve(_, args, context) {
        return context.prisma.plant.update({
          where: {
            id: args.id
          },
          data: {
            name: args.name,
            description: args.description,
          }
        })
      }
    });
  }
})
