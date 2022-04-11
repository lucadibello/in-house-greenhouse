import { ExpressContext } from "apollo-server-express";

import { JWT, TokenType } from '../../utils/jwt/jwt'
import { getAccessTokenSecret, getRefreshTokenSecret, getGreenhouseTokenSecret } from '../../utils/env/env'
import { TokenExpiredError } from "jsonwebtoken";

// initialize JWT class using .env variables
const jwtService = new JWT(
  getAccessTokenSecret(),
  getRefreshTokenSecret(),
  getGreenhouseTokenSecret()
)

export const isLoggedIn = (req: ExpressContext, isGreenhouseToken = false): boolean => {
  try {
    // get request authorization header
    const authorization = req.req.headers.authorization || '';

    // Verify token using JWT object
    var isValid = null
    if (!isGreenhouseToken) {
      isValid = jwtService.verifyToken(authorization, TokenType.TOKEN_ACCESS)
    } else {
      isValid = jwtService.verifyGreenhouseToken(authorization)
    }

    // isValid is null if token is invalid, if it's a User object it means the token is valid
    if (isValid !== null) {
      return true
    } else {
      return false
    }
  } catch (error) {
    if (error instanceof TokenExpiredError) {
      return false
    } else {
      console.log(error)
      return false;
    }
  }
}