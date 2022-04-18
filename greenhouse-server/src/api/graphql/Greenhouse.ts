import { AuthenticationError } from 'apollo-server'
import { extendType, list, nonNull, nullable, objectType, stringArg } from 'nexus'
import { isLoggedIn } from '../../utils/request/authentication'

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

export const GreenhouseMutation = extendType({
  type: 'Mutation',
  definition (t) {
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
      },
      resolve(_, args, context) {
        // Check if user is authenticated
        if (!isLoggedIn(context.req)) {
          throw new AuthenticationError('You must be logged in to perform this action')
        }

        return context.prisma.greenhouse.create({
          data: {
            name: args.name,
            description: args.description
          },
          include: {
            plants: true
          }
        })
      }
    })
  }
})

export const GreenhouseQuery = extendType({
  type: 'Query',
  definition(t) {
    // List all greenhouses
    t.list.nonNull.field('greenhouses', {
      type: 'Greenhouse',
      description: 'List of all known greenhouses',
      resolve(_, args, context) {
        // Check if user is authenticated
        if (!isLoggedIn(context.req)) {
          throw new AuthenticationError('You must be logged in to perform this action')
        }

        return context.prisma.greenhouse.findMany();
      },
    });
  }
})