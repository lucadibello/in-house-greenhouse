import { ApiResponse } from "apisauce";
import { AddPlantResult, Api, getGeneralApiProblem, RemovePlantResult, UpdatePlantResult } from ".."
import { Position } from "../../../models";
import { ApiBase } from "../core/base/ApiBase";
import { AuthenticationError } from "../core/types/exceptions/AuthenticationError";

export class PlantApi extends ApiBase {
  api: Api

  constructor(api: Api) {
    super() 
    this.api = api
  }

  async addPlant(greenhouseId: string, update: {name: string, description?: string, position: Position}): Promise<AddPlantResult> {
    try {
      // make the api call
      const response: ApiResponse<any> = await this.api.apisauce.post(`/addPlant`, {
        query: `mutation AddPlant($greenhouseId: String!, $name: String!, $positionType: PositionType!, $description: String) {
          addPlant(greenhouseId: $greenhouseId, name: $name, positionType: $positionType, description: $description) {
            id
            name
            description
            created_at
            updated_at
            greenhouseId
            isDeleted
            position {
              name
              type
            }
          }
        }`,
        variables: {
          greenhouseId: greenhouseId,
          name: update.name,
          description: update.description || null,
          positionType: update.position.type
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
      // Let the exception bubble up if is an AuthenticationError
      if (e instanceof AuthenticationError) {
        throw e
      } else {
        __DEV__ && console.tron.log(e.message)
        return { kind: "bad-data" }
      }
    }
  }

  async updatePlant(plantId: number, update: {name: string, description?: string, position: Position}): Promise<UpdatePlantResult> {
    try {
      // make the api call
      const response: ApiResponse<any> = await this.api.apisauce.post(`/updatePlant`, {
        query: `mutation UpdatePlant($updatePlantId: Int!, $positionType: PositionType!, $name: String!, $description: String) {
          updatePlant(id: $updatePlantId, positionType: $positionType, name: $name, description: $description) {
            id
            name
            description
            created_at
            updated_at
            greenhouseId
            positionType
            isDeleted
            position {
              name
              type
            }
          }
        }`, 
        variables: {
          updatePlantId: plantId,
          name: update.name,
          description: update.description || null,
          positionType: update.position.type
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
      // Let the exception bubble up if is an AuthenticationError
      if (e instanceof AuthenticationError) {
        throw e
      } else {
        __DEV__ && console.tron.log(e.message)
        return { kind: "bad-data" }
      }
    }
  }

  async removePlant(plantId: number, onSuccessCallback?: () => void): Promise<RemovePlantResult> {
    try {
      // make the api call
      const response: ApiResponse<any> = await this.api.apisauce.post(`/removePlant`, {
        query: `mutation RemovePlant($removePlantId: Int!) {
          removePlant(id: $removePlantId) {
            isDeleted
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
      
      // call the callback function if it exists
      if (onSuccessCallback) {
        onSuccessCallback()
      }

      // send back data 
      const graphQLResponse = response.data
      return {kind: 'ok', plant: graphQLResponse.data.removePlant}
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
