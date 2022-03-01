import { extendType, nonNull, objectType, stringArg } from 'nexus'

export const User = objectType({
  name: 'User',
  definition(t) {
    t.nonNull.int('id')
    t.nonNull.string('email')
    t.nonNull.string('name')
    t.nonNull.string('surname')
    t.nonNull.string('password')
  },
})

export const UserQuery = extendType({
  type: 'Query',
  definition(t) {
    t.list.nonNull.field('users', {
      type: 'User',
      resolve(_, args, context) {
        return context.prisma.user.findMany();
      },
    });
    t.nonNull.field('addUser', {
      type: 'User',
      args: {
        email: nonNull(stringArg()),
        name: nonNull(stringArg()),
        surname: nonNull(stringArg()),
        password: nonNull(stringArg()),
      },
      resolve: async (_, args, context) => {
        return context.prisma.user.create({
          data: {
            email: args.email,
            name: args.name,
            surname: args.surname,
            password: args.password
          }
        })
      }
    })
  },
})