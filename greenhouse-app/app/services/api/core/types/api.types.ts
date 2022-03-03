import { GeneralApiProblem } from '../problem/api-problem'
import { Greenhouse } from "../../../../models/greenhouse/greenhouse"

// Define greenhouse API response types
export type GetGreenhousesResult = { kind: "ok" | string; greenhouses: Greenhouse[] } | GeneralApiProblem;
export type GetGreenhouseResult = { kind: "ok"; greenhouse: Greenhouse } | GeneralApiProblem;