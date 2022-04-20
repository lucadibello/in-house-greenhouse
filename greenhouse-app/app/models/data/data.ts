import { Instance, SnapshotOut, types } from "mobx-state-tree"

/**
 * Model description here for TypeScript hints.
 */
export const DataModel = types
  .model("Data")
  .props({
    id: types.identifier,
    sensor: types.string,
    value: types.number,
    greenhouseId: types.string,
    created_at: types.string,
    updated_at: types.string
  })

type DataType = Instance<typeof DataModel>
export interface Data extends DataType {}
type DataSnapshotType = SnapshotOut<typeof DataModel>
export interface DataSnapshot extends DataSnapshotType {}
export const createDataDefaultModel = () => types.optional(DataModel, {})
