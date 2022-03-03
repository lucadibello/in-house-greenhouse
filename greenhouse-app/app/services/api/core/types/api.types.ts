import { GeneralApiProblem } from '../problem/api-problem'
import { Character } from "../../../../models/character/character"
import { Greenhouse } from "../../../../models/greenhouse/greenhouse"

// FIXME: Remove these useless types + intefaces
export interface User { id: number, name: string }
export type GetUsersResult = { kind: "ok"; users: User[] } | GeneralApiProblem
export type GetUserResult = { kind: "ok"; user: User } | GeneralApiProblem
export type GetCharactersResult = { kind: "ok"; characters: Character[] } | GeneralApiProblem
export type GetCharacterResult = { kind: "ok"; character: Character } | GeneralApiProblem

// Define greenhouse API response types
export type GetGreenhousesResult = { kind: "ok" | string; greenhouses: Greenhouse[] } | GeneralApiProblem;
export type GetGreenhouseResult = { kind: "ok"; greenhouse: Greenhouse } | GeneralApiProblem;