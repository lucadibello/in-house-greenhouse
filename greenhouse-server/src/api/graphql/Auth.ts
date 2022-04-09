import { extendType, nonNull, objectType, stringArg } from "nexus"
import { compare, hashSync, genSaltSync } from 'bcrypt'
import { JWT, TokenType } from '../../utils/jwt/jwt'
import { getAccessTokenSecret, getRefreshTokenSecret } from '../../utils/env/env'
import { User } from "./User"

// initialize JWT class using .env variables
const jwtService = new JWT(
  getAccessTokenSecret(),
  getRefreshTokenSecret()
)

export const Auth = objectType({
  name: 'Auth',
  definition(t) {
    t.string('token', { description: "JWT token used to access API" })
    t.string('refreshToken', { description: "JWT token used to refresh access token. Expires in 7 days." })
    t.string('expire', { description: "Access token expire time"})
    t.string('issued', { description: "Access token issued time"})
    t.boolean('isError', { description: "Authentication error flag"})
    t.string('errorCode', { description: "Authentication error code"})
    t.string('errorMessage', { description: "Authentication error message"})
    t.field('user', {type: User})
  }
})

export const AuthMutation = extendType({
  type: 'Mutation',
  definition(t) {
    // Field for registering users
    t.nonNull.field('registerUser', {
      type: 'Auth',
      args: {
        email: nonNull(stringArg()),
        name: nonNull(stringArg()),
        surname: nonNull(stringArg()),
        password: nonNull(stringArg()),
      },
      resolve: async (_, args, context) => {
        try {
          // Register user
          const user = await context.prisma.user.create({
            data: {
              email: args.email,
              name: args.name,
              surname: args.surname,
              password: hashSync(args.password, genSaltSync(12))
            }
          })

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
            issued: session.issued.toISOString(),
            user: user
          }
        } catch (e: any) {
          // Add console.log to see error
          console.log(e)

          return {
            token: null,
            accessToken: null,
            isError: true,
            errorCode: 'REGISTER_DB_ERROR',
            errorMessage: e.message,
            expire: null,
            issued: null,
            user: null
          }
        }
      }
    });
  }
})

export const AuthQuery = extendType({
  type: 'Query',
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
            expire: null,
            user: null
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
            issued: session.issued.toISOString(),
            user: user
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
            issued: null,
            user: null
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
        const userData = jwtService.verifyToken(args.refreshToken, TokenType.TOKEN_REFRESH)
        
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
            expire: null,
            user: null
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
            issued: session.issued.toISOString(),
            user: null
          }
        }
      }
    });
  }
})
