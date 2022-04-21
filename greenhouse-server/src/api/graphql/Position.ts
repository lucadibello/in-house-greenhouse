import { extendType, objectType } from "nexus";

export const Position = objectType({
  name: 'Position',
  definition(t) {
    t.nonNull.string('name', { description: 'Position readable name'})
    t.nonNull.field('type', { type: "PositionType", description: 'Position type'})
  }
})

export const PositionQuery = extendType({
  type: 'Query',
  definition(t) {
    t.list.nonNull.field('positions', {
      type: 'Position',
      description: 'List of all known positions',
      resolve(_, args, context) {
        return context.prisma.position.findMany();
      },
    });
  }
})