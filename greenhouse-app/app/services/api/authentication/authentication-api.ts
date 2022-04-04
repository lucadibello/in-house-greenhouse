import { ApiResponse } from "apisauce"
import { Api } from "../core/api"
import { getGeneralApiProblem } from "../core/problem/api-problem"
import { AuthenticationResult } from "../core/types/api.result.types"

export class AuthenticationApi {
  private api: Api
  
  constructor(api: Api) {
    this.api = api
  }

  async login(email: string, password: string): Promise<AuthenticationResult> {
    try {
      // make the api call
      const response: ApiResponse<any> = await this.api.apisauce.post(`/login`,{
        query: `query LoginUser($email: String!, $password: String!) {
          loginUser(email: $email, password: $password) {
            token
            isError
            errorMessage
            refreshToken
            errorCode
          }
        }`,
        variables: {
          email: email,
          password: password
        }
      })

      // the typical ways to die when calling an api
      if (!response.ok) {
        const problem = getGeneralApiProblem(response)
        if (problem) {
          return problem
        }
      }

      // Read API response
      const userApiResponse = response.data.data.loginUser
      
      // Check if authentication error
      if (userApiResponse.isError) {
        // Return login error with error message
        return {
          kind: "not-ok",
          token: "",
          refreshToken: "",
          user: null,
          isError: true,
          errorCode: userApiResponse.errorCode,
          errorMessage: userApiResponse.errorMessage
        }
      } else {
        // Return data
        return {
          kind: "ok",
          token: userApiResponse.token,
          refreshToken: userApiResponse.refreshToken,
          user: null,
          isError: true,
          errorCode: userApiResponse.errorCode,
          errorMessage: userApiResponse.errorMessage
        }
      }
    } catch (e) {
      __DEV__ && console.tron.log(e.message)
      return { kind: "bad-data" }
    }
  }

  async register (name: string, surname: string, email: string, password: string): Promise<any> {
    try {
      // make the api call
      const response: ApiResponse<any> = await this.api.apisauce.post(`/register`,{
        query: `query RegisterUser($email: String!, $name: String!, $surname: String!, $password: String!) {
          registerUser(email: $email, name: $name, surname: $surname, password: $password) {
            token
            isError
            errorCode
            errorMessage
            refreshToken
          }
        }`,
        variables: {
          name: name,
          surname: surname,
          email: email,
          password: password
        }
      })

      // the typical ways to die when calling an api
      if (!response.ok) {
        const problem = getGeneralApiProblem(response)
        if (problem) {
          return problem
        }
      }

      // Read API response
      const userApiResponse = response.data.data.registerUser
      
      // Check if authentication error
      if (userApiResponse.isError) {
        // Return login error with error message
        return {
          kind: "not-ok",
          token: "",
          refreshToken: "",
          user: null,
          isError: true,
          errorCode: userApiResponse.errorCode,
          errorMessage: userApiResponse.errorMessage
        }
      } else {
        // Return data
        return {
          kind: "ok",
          token: userApiResponse.token,
          refreshToken: userApiResponse.refreshToken,
          user: null,
          isError: true,
          errorCode: userApiResponse.errorCode,
          errorMessage: userApiResponse.errorMessage
        }
      }
    } catch (e) {
      __DEV__ && console.tron.log(e.message)
      return { kind: "bad-data" }
    }
  }
  
  async refreshToken (refreshToken: string): Promise<AuthenticationResult> {
    try {
      // make the api call
      const response: ApiResponse<any> = await this.api.apisauce.post(`/refreshToken`,{
        query: `query RefreshToken($refreshToken: String!) {
          refreshToken(refreshToken: $refreshToken) {
            token
            isError
            errorCode
            errorMessage
            refreshToken
          }
        }`,
        variables: {
          refreshToken: refreshToken
        }
      })

      // the typical ways to die when calling an api
      if (!response.ok) {
        const problem = getGeneralApiProblem(response)
        if (problem) {
          return problem
        }
      }

      // Read API response
      const userApiResponse = response.data.data.refreshToken

      // Check if authentication error
      if (userApiResponse.isError) {
        // Return login error with error message
        return {
          kind: "not-ok",
          token: "",
          refreshToken: "",
          user: null,
          isError: true,
          errorCode: userApiResponse.errorCode,
          errorMessage: userApiResponse.errorMessage
        }
      } else {
        // Return data
        return {
          kind: "ok",
          token: userApiResponse.token,
          refreshToken: userApiResponse.refreshToken,
          user: null,
          isError: false,
          errorCode: userApiResponse.errorCode,
          errorMessage: userApiResponse.errorMessage
        }
      }
    } catch (e) {
      __DEV__ && console.tron.log(e.message)
      return null 
    }
  }
}
