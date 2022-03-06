import { Instance, SnapshotOut, types } from "mobx-state-tree"

/**
 * Model description here for TypeScript hints.
 */
export const GreenhouseModel = types
  .model("Greenhouse")
  .props({
    id: types.string,
    name: types.string,
    description: types.maybeNull(types.string),
    isOkay: types.boolean,
    created_at: types.string,
    updated_at: types.string
  })

type GreenhouseType = Instance<typeof GreenhouseModel>
export interface Greenhouse extends GreenhouseType {}
type GreenhouseSnapshotType = SnapshotOut<typeof GreenhouseModel>
export interface GreenhouseSnapshot extends GreenhouseSnapshotType {}
export const createGreenhouseDefaultModel = () => types.optional(GreenhouseModel, {})
