import { ApiResponse } from "apisauce";
import { Api } from "../core/api";
import { ApiBase } from "../core/base/ApiBase";
import { getGeneralApiProblem } from "../core/problem/api-problem";
import { GetPositionsResult } from "../core/types/api.result.types";
import { AuthenticationError } from "../core/types/exceptions/AuthenticationError";

export class PositionApi extends ApiBase {

  api: Api;

  constructor(api: Api) {
    super()
    this.api = api;    
  }

  async getPositions(): Promise<GetPositionsResult> {
    try {
      // make the api call
      const response: ApiResponse<any> = await this.api.apisauce.post(`/positions`, {
        query: `query {
          __type(name:"Position"){
            name
            enumValues{
              name
            }
          }
        }`
      })

      // Check if GraphQL response is an AuthenticationError
      if (this.isAuthenticationErrorResponse(response)) {
        // Throw authentication exception
        throw new AuthenticationError("Authentication error")
      }
      
      // the typical ways to die when calling an api
      if (!response.ok) {
        const problem = getGeneralApiProblem(response)
        if (problem) {
          return problem
        }
      }

      // send back data 
      const graphQLResponse = response.data
      return {kind: 'ok', positions: graphQLResponse.data.__type.enumValues}
    } catch (e) {
      // Let the exception bubble up if is an AuthenticationError
      if (e instanceof AuthenticationError) {
        throw e
      } else {
        __DEV__ && console.tron.log(e.message)
        return { kind: "bad-data" }
      }
    }
  }
}
