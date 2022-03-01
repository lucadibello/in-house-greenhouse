import { extendType, nonNull, nullable, objectType, stringArg } from 'nexus'

export const Greenhouse = objectType({
  name: 'Greenhouse',
  definition(t) {
    t.nonNull.string('id')
    t.nonNull.string('name')
    t.string('description')
    t.nonNull.field('created_at', { type: "dateTime" })
    t.nonNull.field('updated_at', { type: "dateTime" })
  },
})

export const GreenhouseQuery = extendType({
  type: 'Query',
  definition(t) {
    t.list.nonNull.field('greenhouses', {
      type: 'Greenhouse',
      resolve(_, args, context) {
        return context.prisma.greenhouse.findMany();
      },
    });
    t.field('addGreenhouse', {
      type: 'Greenhouse',
      args: {
        name: nonNull(stringArg()),
        description: nullable(stringArg())
      },
      resolve(_, args, context) {
        return context.prisma.greenhouse.create({
          data: {
            name: args.name,
            description: args.description
          }
        })
      }
    })
  }
})