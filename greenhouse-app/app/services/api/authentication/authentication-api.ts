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
        query: `query Login($email: String!, $password: String!) {
          login(email: $email, password: $password) {
            token
            user {
              id
              name
              email
              password
              surname
              createdAt
              updatedAt
            }
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

      const graphQLResponse = response.data

      // List greenhouses
      const token = graphQLResponse.data.login.token
      const user = graphQLResponse.data.login.user
      const outputData = {kind: "ok", token: token, user: user};
      console.tron.log("[API] Returning data..", outputData)
      // Return data
      return outputData;
    } catch (e) {
      __DEV__ && console.tron.log(e.message)
      return { kind: "bad-data" }
    }
  }
}
