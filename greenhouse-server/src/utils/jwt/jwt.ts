import { User } from '@prisma/client'
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

export class JWT {
  private accessTokenExpiresIn: number
  private refreshTokenExpiresIn: number
  private accessSecret: string
  private refreshSecret: string

  constructor (accessSecret: string, refeshSecret: string ,accessTokenExpiresIn = 60*30, refreshTokenExpiresIn = 60*60*24*7) {
    this.accessTokenExpiresIn = accessTokenExpiresIn
    this.refreshTokenExpiresIn = refreshTokenExpiresIn
    this.accessSecret = accessSecret
    this.refreshSecret = refeshSecret
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
   * @param refreshToken - JWT refresh token
   * @returns Return user data if access token is valid, null otherwise
   */
  public verifyToken (refreshToken: string): User | null {
    try {
      return verify(refreshToken, this.refreshSecret) as User
    } catch (err) {
      return null
    }
  }
}

