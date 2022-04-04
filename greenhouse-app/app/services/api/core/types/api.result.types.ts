import { GeneralApiProblem } from '../problem/api-problem'
import { Greenhouse } from "../../../../models/greenhouse/greenhouse"
import { Plant } from '../../../../models/plant/plant';
import { User, UserSnapshot } from '../../../../models/user/user';

// Define greenhouse API response types
export type GetGreenhousesResult = { kind: "ok" | string; greenhouses: Greenhouse[] } | GeneralApiProblem;
export type GetGreenhouseResult = { kind: "ok"; greenhouse: Greenhouse } | GeneralApiProblem;

// Define plant API response type
export type AddPlantResult = {kind: "ok" | string, plant: Plant} | GeneralApiProblem;
export type UpdatePlantResult = {kind: "ok" | string, plant: Plant} | GeneralApiProblem;
export type RemovePlantResult = {kind: "ok" | string, plant: Plant} | GeneralApiProblem;

// Define authentication API response types
export type AuthenticationResult = { 
  kind: "ok" | string; 
  token: string; 
  refreshToken: string;
  user: UserSnapshot;
  isError: boolean;
  errorCode: string;
  errorMessage: string;
} | GeneralApiProblem;

export type RefreshResult = {
  kind: "ok" | string; 
  token: string; 
  refreshToken: string;
  isError: boolean;
  errorCode: string;
  errorMessage: string;
} | GeneralApiProblem;
