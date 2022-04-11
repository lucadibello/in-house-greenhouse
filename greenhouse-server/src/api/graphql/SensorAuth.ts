import { extendType, nonNull, objectType, stringArg } from "nexus"
import { getAccessTokenSecret, getRefreshTokenSecret, getGreenhouseTokenSecret } from '../../utils/env/env'
import { JWT } from "../../utils/jwt/jwt"

export const SensorAuth = objectType({
  name: 'SensorAuth',
  definition(t) {
    t.string('token', { description: "JWT token used to access API" })
    t.string('expire', { description: "Access token expire time"})
    t.string('issued', { description: "Access token issued time"})
    t.string('errorCode', { description: "Authentication error code"})
    t.string('errorMessage', { description: "Authentication error message"})
  }
})

// initialize JWT class using .env variables
const jwtService = new JWT(
  getAccessTokenSecret(),
  getRefreshTokenSecret(),
  getGreenhouseTokenSecret()
)

export const SensorAuthQuery = extendType({
  type: 'Query',
  definition(t) {
    // Field for registering users
    t.nonNull.field('greenhouseAuth', {
      type: 'SensorAuth',
      args: {
        greenhouseId: nonNull(stringArg()),
      },
      resolve: async (_, args, context) => {
        // Check if greenhouse id exists in database
        const greenhouse = await context.prisma.greenhouse.findFirst({
          where: {
            id: args.greenhouseId
          }
        })

        // Check if greenhouse exists
        if (!greenhouse) {
          return {
            token: null,
            expire: null,
            issued: null,
            errorCode: 'GREENHOUSE_NOT_FOUND',
            errorMessage: 'Greenhouse not found'
          }
        } else {
          // Encode session with 30 seconds expiration
          const session = jwtService.encodeGreenhouse(greenhouse)

          // Password is correct, return Auth object with signed token
          return {
            token: session.accessToken,
            expire: session.expire.toISOString(), 
            issued: session.issued.toISOString(),
            errorCode: null,
            errorMessage: ''
          }
        }
      }
    })
  }
})
