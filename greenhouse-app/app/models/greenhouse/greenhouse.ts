import { Instance, SnapshotOut, types } from "mobx-state-tree"
import { PlantModel } from ".."

/**
 * Greenhouse model
 */
export const GreenhouseModel = types.model("Greenhouse").props({
  id: types.identifierNumber,
  name: types.string,
  plants: types.array(PlantModel),
  description: types.maybe(types.string),
  created_at: types.Date,
  updated_at: types.Date
})

type GreenhouseType = Instance<typeof GreenhouseModel>
export interface Greenhouse extends GreenhouseType {}
type GreenhouseSnapshotType = SnapshotOut<typeof GreenhouseModel>
export interface GreenhouseSnapshot extends GreenhouseSnapshotType {}
export const createGreenhouseDefaultModel = () => types.optional(GreenhouseModel, {})
