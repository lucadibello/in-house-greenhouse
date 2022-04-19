import { Instance, SnapshotOut, types } from "mobx-state-tree"

/**
 * Model description here for TypeScript hints.
 */
export const PositionModel = types
  .model("Position")
  .props({
    name: types.string,
    type: types.string
  })

type PositionType = Instance<typeof PositionModel>
export interface Position extends PositionType {}
type PositionSnapshotType = SnapshotOut<typeof PositionModel>
export interface PositionSnapshot extends PositionSnapshotType {}
export const createPositionDefaultModel = () => types.optional(PositionModel, {})
