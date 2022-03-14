import { Instance, SnapshotOut, types } from "mobx-state-tree"
import { GreenhouseModel } from "../greenhouse/greenhouse"

/**
 * Model description here for TypeScript hints.
 */
export const NavigationStoreModel = types
  .model("NavigationStore")
  .props({
    greenhouseScreenParams: types.model('GreenhouseScreenParams', {
      greenhouse: types.maybe(types.safeReference(GreenhouseModel)),
    }),
  })

type NavigationStoreType = Instance<typeof NavigationStoreModel>
export interface NavigationStore extends NavigationStoreType {}
type NavigationStoreSnapshotType = SnapshotOut<typeof NavigationStoreModel>
export interface NavigationStoreSnapshot extends NavigationStoreSnapshotType {}
export const createNavigationStoreDefaultModel = () => types.optional(NavigationStoreModel, {})
