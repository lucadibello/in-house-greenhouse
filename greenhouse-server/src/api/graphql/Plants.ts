import { AuthenticationError } from "apollo-server";
import { arg, extendType, inputObjectType, intArg, nonNull, nullable, objectType, stringArg } from "nexus";
import { isLoggedIn } from "../../utils/request/authentication";
import { PositionType } from "./enums";
import { Position } from "./Position";

export const Plant = objectType({
  name: 'Plant',
  definition(t) {
    t.nonNull.int('id', { description: 'Plant identification number'})
    t.nonNull.string('name', {description: 'Plant name'})
    t.nullable.string('description', {description: 'Plant description'})
    t.nonNull.field('created_at', { type: "dateTime", description: 'Last update timestamp' })
    t.nonNull.field('updated_at', { type: "dateTime", description: 'Last update timestamp' })
    t.nullable.string('greenhouseId', {description: 'Greenhouse ID'})
    t.nonNull.field('positionType', {type: PositionType, description: 'Plant position inside the greenhouse'})
    t.nonNull.boolean('isDeleted', { description: 'Flag that shows if the plant has been deleted or not'})
    t.field('position', {
      type: Position,
      resolve: (parent, _, ctx) => {
        return ctx.prisma.position.findUnique({
          where: { type: parent.positionType },
        })
      },
    });
  },
})

export const PlantInput = inputObjectType({
  name: "PlantInput",
  definition(t) {
    t.nonNull.string('name')
    t.string('description')
    t.nonNull.field('position', {type: PositionType})
  }
})

export const PlantMutation = extendType({
  type: 'Mutation',
  definition(t) {
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
        })),
        positionType: nonNull(arg({
          type: PositionType,
          description: 'Position of the plant inside the greenhouse',
        }))
      },
      resolve(_, args, context) {
        // Check if user is authenticated
        if (!isLoggedIn(context.req)) {
          throw new AuthenticationError('You must be logged in to perform this action')
        }

        return context.prisma.plant.create({
          data: {
            name: args.name,
            description: args.description,
            greenhouseId: args.greenhouseId,
            positionType: args.positionType
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
        })),
        positionType: nonNull(arg({
          type: PositionType,
          description: 'Position of the plant inside the greenhouse',
        }))
      },
      resolve(_, args, context) {
        // Check if user is authenticated
        if (!isLoggedIn(context.req)) {
          throw new AuthenticationError('You must be logged in to perform this action')
        }
        
        return context.prisma.plant.update({
          where: {
            id: args.id
          },
          data: {
            name: args.name,
            description: args.description,
            positionType: args.positionType
          }
        })
      }
    });

    // Update plant
    t.field('removePlant', {
      type: 'Plant',
      description: 'Remove a Plant from its greenhouse',
      args: {
        id: nonNull(intArg({
          description: 'Plant ID'
        }))
      },
      resolve(_, args, context) {
        // Check if user is authenticated
        if (!isLoggedIn(context.req)) {
          throw new AuthenticationError('You must be logged in to perform this action')
        }
        
        return context.prisma.plant.update({
          where: {
            id: args.id
          },
          data: {
            isDeleted: true
          }
        })
      } 
    });
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
        // Check if user is authenticated
        if (!isLoggedIn(context.req)) {
          throw new AuthenticationError('You must be logged in to perform this action')
        }

        return context.prisma.plant.findMany();
      },
    });
  }
})
