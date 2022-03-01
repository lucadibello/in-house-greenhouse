import { extendType, objectType } from 'nexus'

export const Greenhouse = objectType({
  name: 'Greenhouse',
  definition(t) {
    t.nonNull.string('id')
    t.nonNull.string('name')
    t.string('description')
    t.field('created_at', { type: "dateTime" })
    t.field('updated_at', { type: "dateTime" })
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
  }
})