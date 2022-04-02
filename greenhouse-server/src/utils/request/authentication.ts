import { ExpressContext } from "apollo-server-express";

import { JWT, TokenType } from '../../utils/jwt/jwt'
import { getAccessTokenSecret, getRefreshTokenSecret } from '../../utils/env/env'

// initialize JWT class using .env variables
const jwtService = new JWT(
  getAccessTokenSecret(),
  getRefreshTokenSecret()
)

export const isLoggedIn = (req: ExpressContext): boolean => {
  // get request authorization header
  const authorization = req.req.headers.authorization || '';

  // Verify token using JWT object
  const isValid = jwtService.verifyToken(authorization, TokenType.TOKEN_ACCESS)

  // isValid is null if token is invalid, if it's a User object it means the token is valid
  if (isValid !== null) {
    return true
  } else {
    return false
  }
}