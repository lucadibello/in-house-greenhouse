import { GeneralApiProblem } from '../problem/api-problem'
import { Greenhouse } from "../../../../models/greenhouse/greenhouse"
import { Plant } from '../../../../models/plant/plant';

// Define greenhouse API response types
export type GetGreenhousesResult = { kind: "ok" | string; greenhouses: Greenhouse[] } | GeneralApiProblem;
export type GetGreenhouseResult = { kind: "ok"; greenhouse: Greenhouse } | GeneralApiProblem;

// Define plant API response type
export type AddPlantResult = {kind: "ok" | string, plant: Plant} | GeneralApiProblem;