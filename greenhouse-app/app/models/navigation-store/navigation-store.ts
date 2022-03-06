import { Instance, SnapshotOut, types } from "mobx-state-tree"

/**
 * Model description here for TypeScript hints.
 */
export const NavigationStoreModel = types
  .model("NavigationStore")
  .props({})
  .views((self) => ({})) // eslint-disable-line @typescript-eslint/no-unused-vars
  .actions((self) => ({})) // eslint-disable-line @typescript-eslint/no-unused-vars

type NavigationStoreType = Instance<typeof NavigationStoreModel>
export interface NavigationStore extends NavigationStoreType {}
type NavigationStoreSnapshotType = SnapshotOut<typeof NavigationStoreModel>
export interface NavigationStoreSnapshot extends NavigationStoreSnapshotType {}
export const createNavigationStoreDefaultModel = () => types.optional(NavigationStoreModel, {})
