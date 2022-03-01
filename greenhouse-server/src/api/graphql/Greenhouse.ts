import { asNexusMethod, extendType, nonNull, objectType, stringArg } from 'nexus'

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