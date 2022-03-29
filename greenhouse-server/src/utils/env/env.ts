/**
 * getAccessTokenSecret - Get access token secret from .env file 
 * @returns Access token secret as a string 
 */
export const getAccessTokenSecret = (): string => {
  if (process.env.JWT_ACCESS_TOKEN_SECRET !== undefined) {
    return process.env.JWT_ACCESS_TOKEN_SECRET as string
  } else {
    console.warn('JWT_ACCESS_TOKEN_SECRET is not defined')
    return "MISSING*ACCESS*SECRET!"
  }
}

/**
 * getRefreshTokenSecret - Get refresh token secret from .env file
 * @returns Refresh token secret as a string
 */
export const getRefreshTokenSecret = (): string => {
  if (process.env.JWT_REFRESH_TOKEN_SECRET !== undefined) {
    return process.env.JWT_REFRESH_TOKEN_SECRET as string
  } else {
    console.warn('JWT_REFRESH_TOKEN_SECRET is not defined')
    return "MISSING*REFRESH*SECRET!"
  }
}