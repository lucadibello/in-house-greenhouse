import { ApiResponse } from "apisauce";
import { AddPlantResult, Api, getGeneralApiProblem } from "../"
import { Plant } from "../../../models/plant/plant";

export class PlantApi {
  private api: Api

  constructor(api: Api) {
    this.api = api
  }

  async addPlant(greenhouseId: string, name: string, description?: string): Promise<AddPlantResult> {
    try {
      // make the api call
      const response: ApiResponse<any> = await this.api.apisauce.post(`/addPlant`, {
        "greenhouseId": greenhouseId,
        "name": name,
        "description": description,
        query: `query AddPlant($greenhouseId: String!, $name: String!, $description: String) {
          addPlant(greenhouseId: $greenhouseId, name: $name, description: $description) {
            id
            name
            description
            created_at
            updated_at
            greenhouseId
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
      const plants: Plant[] = graphQLResponse.data
      const outputData = {kind: "ok", plant: plants};
      // Return data
      return outputData;
    } catch (e) {
      __DEV__ && console.tron.log(e.message)
      return { kind: "bad-data" }
    }
  }

  async updatePlant(plantId: number, update: {name: string, description?: string}) {
    try {
      // make the api call
      const response: ApiResponse<any> = await this.api.apisauce.post(`/updatePlant`, {
        query: `query UpdatePlant($updatePlantId: Int!, $name: String!, $description: String) {
          updatePlant(id: $updatePlantId, name: $name, description: $description) {
            id
            name
            description
            created_at
            updated_at
            greenhouseId
          }
        }`, 
        variables: {
          updatePlantId: plantId,
          name: update.name,
          description: update.description
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
      return {key: 'ok', plant: graphQLResponse.data.updatePlant}
    } catch (e) {
      __DEV__ && console.tron.log(e.message)
      return { kind: "bad-data" }
    }
  }
}
