import { AuthenticationError } from 'apollo-server'
import { extendType, nonNull, objectType, stringArg } from 'nexus'
import { isLoggedIn } from '../../utils/request/authentication'

export const User = objectType({
  name: 'User',
  definition(t) {
    t.nonNull.int('id', { description: 'User identification number'})
    t.nonNull.string('email', { description: 'User email'})
    t.nonNull.string('name', { description: 'User name'})
    t.nonNull.string('surname', { description: 'User surname'})
    t.nonNull.string('password', { description: 'User password (hashed)'})
  },
})

export const UserQuery = extendType({
  type: 'Query',
  definition(t) {
    t.list.nonNull.field('users', {
      type: 'User',
      resolve(_, args, context) {
        // Check if user is authenticated
        if (!isLoggedIn(context.req)) {
          throw new AuthenticationError('You must be logged in to perform this action')
        }
        
        return context.prisma.user.findMany();
      },
    });
  } 
})