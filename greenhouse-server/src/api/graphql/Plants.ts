import { inputObjectType, objectType } from "nexus";

export const Plant = objectType({
  name: 'Plant',
  definition(t) {
    t.nonNull.int('id')
    t.nonNull.string('name')
    t.string('description')
    t.field('created_at', { type: "dateTime" })
    t.field('updated_at', { type: "dateTime" })
  },
})

export const PlantInput = inputObjectType({
  name: "PlantInput",
  definition(t) {
    t.nonNull.string('name')
    t.string('description')
  }
})

/*
export const PlantQuery = extendType({
  type: 'Query'
})
*/
