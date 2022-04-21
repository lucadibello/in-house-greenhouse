import { GeneralApiProblem } from '../problem/api-problem'
import { Greenhouse } from "../../../../models/greenhouse/greenhouse"
import { Plant } from '../../../../models/plant/plant';
import { UserSnapshot } from '../../../../models/user/user';
import { Position } from '../../../../models/position/position';
import { Data } from '../../../../models/data/data';

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

export type GetPlantDataResult = {
  kind: "ok" | string;
  data: Data[]
} | GeneralApiProblem;

// Define position API response types
export type GetPositionsResult = { kind: "ok" | string; positions: Position[] } | GeneralApiProblem;