import { ApiResponse } from "apisauce";
import { Api, getGeneralApiProblem, GetGreenhousesResult } from "../"
import { Greenhouse } from "../../../models/greenhouse/greenhouse";
import { ApiBase } from "../core/base/ApiBase";
import { AuthenticationError } from "../core/types/exceptions/AuthenticationError";

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
              position
              isDeleted
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
      
      const graphQLResponse = response.data

      // For each plant contained in each greenhouses, format the "position" string into a dictionary with this format:
      // {
      // "name": <position_value>,
      // }
      // And replace the new format into the result object
      graphQLResponse.data.greenhouses.forEach(greenhouse => {
        greenhouse.plants.forEach(plant => {
          plant.position = {
            name: plant.position
          }
        })
      })

      // List greenhouses
      const greenhouses: Greenhouse[] = graphQLResponse.data.greenhouses
      const outputData = {kind: "ok", greenhouses: greenhouses};
      console.tron.log("[API] Returning data..", outputData)
      // Return data
      return outputData;
    } catch (e) {
      // Let the exception bubble up if is an AuthenticationError
      if (e instanceof AuthenticationError) {
        throw e
      } else {
        __DEV__ && console.tron.log(e)
        return { kind: "bad-data" }
      }
    }
  }
}
