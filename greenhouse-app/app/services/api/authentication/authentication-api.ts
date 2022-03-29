import { ApiResponse } from "apisauce"
import { Api } from "../core/api"
import { getGeneralApiProblem } from "../core/problem/api-problem"
import { LoginResult } from "../core/types/api.types"

export class AuthenticationApi {
  private api: Api
  
  constructor(api: Api) {
    this.api = api
  }

  async login(email: string, password: string): Promise<LoginResult> {
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
}
