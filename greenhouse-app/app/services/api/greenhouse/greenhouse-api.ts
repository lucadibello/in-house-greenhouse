import { ApiResponse } from "apisauce";
import { Api, getGeneralApiProblem, GetGreenhousesResult } from "../"
import { Greenhouse } from "../../../models/greenhouse/greenhouse";
import { ApiBase } from "../core/base/ApiBase";

export class GreenhouseApi extends ApiBase {
  api: Api

  constructor(api: Api) {
    super()
    this.api = api
  }

  async getGreenhouses(): Promise<GetGreenhousesResult> {
    try {
      // make the api call
      const response: ApiResponse<any> = await this.api.apisauce.post(`/greenhouse`,{
        query: `query Greenhouses {
          greenhouses {
            id
            name
            description
            isOkay
            created_at
            updated_at
            plants {
              id
              name
              description
              created_at
              updated_at
              greenhouseId
            }
          }
        }`
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
      const greenhouses: Greenhouse[] = graphQLResponse.data.greenhouses
      const outputData = {kind: "ok", greenhouses: greenhouses};
      console.tron.log("[API] Returning data..", outputData)
      // Return data
      return outputData;
    } catch (e) {
      __DEV__ && console.tron.log(e.message)
      return { kind: "bad-data" }
    }
  }
}
