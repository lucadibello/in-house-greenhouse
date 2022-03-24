import { arg, extendType, list, nonNull, nullable, objectType, stringArg } from 'nexus'

export const Greenhouse = objectType({
  name: 'Greenhouse',
  definition(t) {
    t.nonNull.string('id', { description: 'Greenhouse identification number'})
    t.nonNull.string('name', { description: 'User-defined greenhouse name'})
    t.string('description', {description: 'Greenhouse description (ex: "Office greenhouse")'})
    t.nonNull.boolean('isOkay', {description: 'Greenhouse valid state flag'})
    t.nonNull.field('created_at', { type: "dateTime", description: 'Creation timestamp'})
    t.nonNull.field('updated_at', { type: "dateTime", description: 'Last update timestamp' })
    t.field('plants', {
      type: list('Plant'),
      description: 'List of plants that are planted in this greenhouse',
      resolve(_, args, context) {
        return context.prisma.plant.findMany({
          where: {greenhouseId: _.id, isDeleted: false}
        })
      },
    })
  },
})

export const GreenhouseQuery = extendType({
  type: 'Query',
  definition(t) {
    // List all greenhouses
    t.list.nonNull.field('greenhouses', {
      type: 'Greenhouse',
      description: 'List of all known greenhouses',
      resolve(_, args, context) {
        return context.prisma.greenhouse.findMany();
      },
    });
    // Create a new greenhouse
    t.field('addGreenhouse', {
      type: 'Greenhouse',
      description: 'Create a new greenhouse',
      args: {
        name: nonNull(stringArg({
          description: "New greenhouse's name"
        })),
        description: nullable(stringArg({
          description: "New greenhouse's description"
        })),
        plants: nullable(list(nonNull(arg({
          type: 'PlantInput',
          description: "List of plants that will be planted inside this greenhouse"
        }))))
      },
      resolve(_, args, context) {
        return context.prisma.greenhouse.create({
          data: {
            name: args.name,
            description: args.description,
            plants: args.plants != null ? {
              createMany: {
                data: args.plants
              }
            } : undefined
          },
          include: {
            plants: true
          }
        })
      }
    })
  }
})