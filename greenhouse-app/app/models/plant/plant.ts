import { Instance, SnapshotOut, types } from "mobx-state-tree"

/**
 * Greenhouse's plant model
 */
export const PlantModel = types.model("Plant").props({
  id: types.string,
  name: types.string,
  description: types.maybe(types.string),
  created_at: types.string,
  updated_at: types.string
})

type PlantType = Instance<typeof PlantModel>
export interface Plant extends PlantType {}
type PlantSnapshotType = SnapshotOut<typeof PlantModel>
export interface PlantSnapshot extends PlantSnapshotType {}
export const createPlantDefaultModel = () => types.optional(PlantModel, {})
