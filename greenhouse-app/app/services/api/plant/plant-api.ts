import { ApiResponse } from "apisauce";
import { AddPlantResult, Api, getGeneralApiProblem, RemovePlantResult, UpdatePlantResult } from ".."
import { ApiBase } from "../core/base/ApiBase";
import { AuthenticationError } from "../core/types/exceptions/AuthenticationError";

export class PlantApi extends ApiBase {
  api: Api

  constructor(api: Api) {
    super() 
    this.api = api
  }

  async addPlant(greenhouseId: string, update: {name: string, description?: string}): Promise<AddPlantResult> {
    try {
      // make the api call
      const response: ApiResponse<any> = await this.api.apisauce.post(`/addPlant`, {
        query: `query AddPlant($greenhouseId: String!, $name: String!, $description: String) {
          addPlant(greenhouseId: $greenhouseId, name: $name, description: $description) {
            id
            name
            description
            created_at
            updated_at
            greenhouseId
          }
        }`,
        variables: {
          greenhouseId: greenhouseId,
          name: update.name,
          description: update.description
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
      // Read response data
      const graphQLResponse = response.data
      
      // List greenhouses
      return {kind: "ok", plant: graphQLResponse.data.addPlant};
    } catch (e) {
      __DEV__ && console.tron.log(e.message)
      return { kind: "bad-data" }
    }
  }

  async updatePlant(plantId: number, update: {name: string, description?: string}): Promise<UpdatePlantResult> {
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
      return {kind: 'ok', plant: graphQLResponse.data.updatePlant}
    } catch (e) {
      __DEV__ && console.tron.log(e.message)
      return { kind: "bad-data" }
    }
  }

  async removePlant(plantId: number): Promise<RemovePlantResult> {
    try {
      // make the api call
      const response: ApiResponse<any> = await this.api.apisauce.post(`/removePlant`, {
        query: `query Query($removePlantId: Int!) {
          removePlant(id: $removePlantId) {
            id
            name
            description
            created_at
            updated_at
            greenhouseId
          }
        }`, 
        variables: {
          removePlantId: plantId
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
      
      // send back data 
      const graphQLResponse = response.data
      return {kind: 'ok', plant: graphQLResponse.data.removePlant}
    } catch (e) {
      __DEV__ && console.tron.log(e.message)
      return { kind: "bad-data" }
    }
  }
}
