import { ApiResponse } from "apisauce";
import { Api, getGeneralApiProblem, GetPlantDataResult } from "../"
import { Plant } from "../../../models/plant/plant";
import { ApiBase } from "../core/base/ApiBase";
import { SensorType } from "../core/types/api.data.types";
import { AuthenticationError } from "../core/types/exceptions/AuthenticationError";

export class DataApi extends ApiBase {
  api: Api

  constructor(api: Api) {
    super()
    this.api = api
  }

  async getPlantData(plant: Plant, type: SensorType): Promise<GetPlantDataResult> {
    try {
      // make the api call
      const response: ApiResponse<any> = await this.api.apisauce.post(`/plantData`,{
        query: `query GetDataByPlant($plantId: Int!, $sensorType: SensorType) {
          getDataByPlant(plantId: $plantId, sensorType: $sensorType) {
            id
            sensor
            value
            greenhouseId
            created_at
            updated_at
          }
        }`,
        variables: {
          plantId: plant.id,
          sensorType: type
        }
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

      // List greenhouses
      const outputData = {kind: "ok", data: response.data.data.getDataByPlant};
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

