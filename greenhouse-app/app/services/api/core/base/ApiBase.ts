import { ApiResponse } from "apisauce";
import { Api } from "../api";

export abstract class ApiBase {
  abstract api: Api

  isAuthenticationErrorResponse (apiResponse: ApiResponse<any, any>): boolean {
    if (apiResponse.data !== null && apiResponse.data.errors !== undefined && apiResponse.data.errors.length > 0) {
      return apiResponse.data.errors[0].extensions.code === "UNAUTHENTICATED"
    }
    return false
  }
}