import { Greenhouse, User } from '@prisma/client'
import { verify } from 'jsonwebtoken'
import { sign } from 'jsonwebtoken'

/**
 * Type that describes a JWT session.
 * It contains the access token, the expiration date and the date of issue.
 */
type Session = {
  accessToken: string,
  expire: Date
  issued: Date
}

export enum TokenType {
  TOKEN_ACCESS, TOKEN_REFRESH
}

export class JWT {
  private accessTokenExpiresIn: number
  private refreshTokenExpiresIn: number
  private greenhouseTokenExpiresIn: number
  private accessSecret: string
  private refreshSecret: string
  private greenhouseSecret: string

  constructor (accessSecret: string, refeshSecret: string , greenhouseSecret: string,accessTokenExpiresIn = 60*30, refreshTokenExpiresIn = 60*60*24*7, greenhouseTokenExpiresIn = 60) {
    this.accessTokenExpiresIn = accessTokenExpiresIn
    this.refreshTokenExpiresIn = refreshTokenExpiresIn
    this.greenhouseTokenExpiresIn = greenhouseTokenExpiresIn
    this.accessSecret = accessSecret
    this.refreshSecret = refeshSecret
    this.greenhouseSecret = greenhouseSecret
  }

  /**
   * expiration - calculate expiration date
   * @param seconds seconds to add to current date
   * @returns new Date with seconds added
   */
  private expiration (seconds: number): Date {
    const date = new Date()
    date.setTime(date.getTime() + (seconds * 1000))
    return date
  }

  /**
   * encodeSession - Generate a JWT session
   * @param user User data to encode inside token
   * @returns A JWT session
   */
  public encodeSession (user: User): Session {
    // Create data object before signing JWT token
    const data = {
      id: user.id,
      email: user.email,
      name: user.name,
      surname: user.surname,
    }

    // Return JWT session
    return {
      accessToken: sign(data, this.accessSecret, { expiresIn: this.accessTokenExpiresIn }),
      expire: this.expiration(this.accessTokenExpiresIn),
      issued: new Date()
    }
  }

  public encodeGreenhouse (greenhouse: Greenhouse): Session {
    // Build data to encode
    const data = {
      id: greenhouse.id,
      name: greenhouse.name,
      description: greenhouse.description
    }
    
    // Return a JWT greenhouse session
    return {
      accessToken: sign(data, this.greenhouseSecret, { expiresIn: this.greenhouseTokenExpiresIn }),
      expire: this.expiration(this.greenhouseTokenExpiresIn),
      issued: new Date()
    }
  }

  /**
   * generateRefreshToken - Generate a new refresh token
   * @param refreshTokenExpiresIn - Refresh token expiration time in seconds
   * @returns Signed JWT token as a string
   */
  public generateRefreshToken () {
    return sign({}, this.refreshSecret, { expiresIn: this.refreshTokenExpiresIn })
  }

  /**
   * verifyToken - Verify JWT refresh token
   * @param token - JWT refresh token
   * @returns Return user data if access token is valid, null otherwise
   */
  public verifyToken (token: string, tokenType: TokenType): User | null {
    if (token == null || token.length == 0) {
      return null
    }
    
    try {
      if (tokenType == TokenType.TOKEN_REFRESH) {
        return verify(token, this.refreshSecret) as User
      } else if (tokenType == TokenType.TOKEN_ACCESS) {
        return verify(token, this.accessSecret) as User
      }
      else {
        return null
      }
    } catch (err) {
      return null
    }
  }

  public verifyGreenhouseToken (token: string): Greenhouse | null {
    if (token == null || token.length == 0) {
      return null
    }
    
    try {
      return verify(token, this.greenhouseSecret) as Greenhouse
    } catch (err) {
      return null
    }
  }
}

