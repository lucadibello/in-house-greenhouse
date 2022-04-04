import { Authentication } from "../models/authentication-store/authentication-store"
import { ApiBase } from "../services/api/core/base/ApiBase"
import { AuthenticationError } from "../services/api/core/exceptions/AuthenticationError"

export const runAuthenticatedApi = async <T>(authenticationStore: Authentication, context: ApiBase, method: (...any) => Promise<T>): Promise<T> => {
  let result: T | null = null

  // Run API method and return result
  // Try to execute API method
  try {
    result = await method.bind(context)()
  } catch (e) {
    if (e instanceof AuthenticationError) {
      // Try to request a new token
      authenticationStore.requestNewTokens((error) => {
        console.tron.warn(error)
      })

      // Update add autorization header to context ApiBase 
      context.api.apisauce.setHeader("Authorization", authenticationStore.accessToken)

      // Retry to fetch greenhouses
      try {
        result = await method.bind(context)()
      } catch (e) {
        if (e instanceof AuthenticationError) {
          authenticationStore.logout()
        } else {
          // Bubble up error
          throw e
        }
      }
    } else {
      // Bubble up error
      throw e
    }
  }
    
  // Finally, return result
  return result
}