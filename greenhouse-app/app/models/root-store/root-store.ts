import { Instance, SnapshotOut, types } from "mobx-state-tree"
import { GreenhouseStoreModel } from "../greenhouse-store/greenhouse-store"

/**
 * A RootStore model.
 */
// prettier-ignore
export const RootStoreModel = types.model("RootStore").props({
  greenhouseStore: types.optional(GreenhouseStoreModel, {} as any)
})

/**
 * The RootStore instance.
 */
export interface RootStore extends Instance<typeof RootStoreModel> {}

/**
 * The data of a RootStore.
 */
export interface RootStoreSnapshot extends SnapshotOut<typeof RootStoreModel> {}
