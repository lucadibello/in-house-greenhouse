import { nonNull, objectType, stringArg } from "nexus"
import { compare } from 'bcrypt'
import { JWT } from '../../utils/jwt/jwt'
import { getAccessTokenSecret, getRefreshTokenSecret } from '../../utils/env/env'

// initialize JWT class using .env variables
const jwtService = new JWT(
  getAccessTokenSecret(),
  getRefreshTokenSecret()
)

export const Auth = objectType({
  name: 'Auth',
  definition(t) {
    t.string('token')
    t.string('refreshToken')
    t.string('expire')
    t.string('issued')
    t.boolean('isError')
    t.string('errorCode')
    t.string('errorMessage')
  }
})

export const AuthQuery = objectType({
  name: 'Query',
  definition(t) {
    // Field for login users
    t.nonNull.field('loginUser', {
      type: 'Auth',
      args: {
        email: nonNull(stringArg()),
        password: nonNull(stringArg())
      },
      resolve: async (_, args, context) => {
        // Find user by email and get password
        const user = await context.prisma.user.findFirst({
          where: {
            email: args.email
          }
        })

        if (!user) {
          // If user not found return error
          return {
            token: null,
            refreshToken: null,
            isError: true,
            errorMessage: 'User or password are incorrect',
            errorCode: 'LOGIN_ERROR',
            issued: null,
            expire: null
          }
        }

        // Compare if the encoded password passed as parameter is the same as the one in the database
        const isPasswordCorrect = await compare(args.password, user.password)

        // Check if password is correct
        if (isPasswordCorrect) {
          // Encode session with 30 minutes expiration
          const session = jwtService.encodeSession(user)

          // Password is correct, return Auth object with signed token
          return {
            token: session.accessToken,
            refreshToken: jwtService.generateRefreshToken(),
            isError: false,
            errorCode: null,
            errorMessage: '',
            expire: session.expire.toISOString(), 
            issued: session.issued.toISOString()
          }
        } else {
          // Return error message
          return {
            token: null,
            accessToken: null,
            isError: true,
            errorCode: 'LOGIN_ERROR',
            errorMessage: 'User or password are incorrect',
            expire: null,
            issued: null
          }
        }
      }
    });
    
    // Field for token refresh
    t.nonNull.field('refreshToken', {
      type: 'Auth',
      args: {
        refreshToken: nonNull(stringArg())
      },
      resolve: async (_, args, context) => {
        // check if JWT refresh token is not expired
        const userData = jwtService.verifyToken(args.refreshToken)

        // Check if refreshToken was valid
        if (userData == null) {
          // Return error
          return {
            token: null,
            refreshToken: null,
            isError: true,
            errorCode: 'REFRESH_TOKEN_ERROR',
            errorMessage: 'Invalid token',
            issued: null,
            expire: null
          }
        } else {
          // Token is valid, generate new session with 30 minutes expiration
          const session = jwtService.encodeSession(userData)

          // Return new access token with old refresh token
          return {
            token: session.accessToken,
            refreshToken: args.refreshToken,
            isError: false,
            errorCode: null,
            errorMessage: '',
            expire: session.expire.toISOString(), 
            issued: session.issued.toISOString()
          }
        }
      }
    });
  }
})
