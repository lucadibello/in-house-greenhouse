import { Instance, SnapshotOut, types } from "mobx-state-tree"
import { PlantModel } from "../plant/plant"

/**
 * Greenhouse model
 */
export const GreenhouseModel = types.model("Greenhouse", {
  id: types.identifierNumber,
  name: types.string,
  description: types.maybe(types.string),
  plants: types.array(types.maybe(PlantModel)),
  updated_at: types.Date,
  created_at: types.Date
})

type GreenhouseType = Instance<typeof GreenhouseModel>
export interface Greenhouse extends GreenhouseType {}
type GreenhouseSnapshotType = SnapshotOut<typeof GreenhouseModel>
export interface GreenhouseSnapshot extends GreenhouseSnapshotType {}
export const createGreenhouseDefaultModel = () => types.optional(GreenhouseModel, {})
