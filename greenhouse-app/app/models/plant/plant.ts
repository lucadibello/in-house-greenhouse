import { Instance, SnapshotOut, types } from "mobx-state-tree"
import { GreenhouseModel } from ".."

/**
 * Greenhouse's plant model
 */
export const PlantModel = types.model("Plant").props({
  id: types.identifierNumber,
  name: types.string,
  description: types.maybe(types.string),
  greenhouse: types.maybe(GreenhouseModel),
  created_at: types.Date,
  updated_at: types.Date
})

type PlantType = Instance<typeof PlantModel>
export interface Plant extends PlantType {}
type PlantSnapshotType = SnapshotOut<typeof PlantModel>
export interface PlantSnapshot extends PlantSnapshotType {}
export const createPlantDefaultModel = () => types.optional(PlantModel, {})
