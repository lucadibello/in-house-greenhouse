import { Instance, SnapshotOut, types } from "mobx-state-tree"
import { GreenhouseModel, Greenhouse } from '../greenhouse/greenhouse'

/**
 * Navigation props using MobX State Tree
 */
export const NavigationStoreModel = types
  .model("NavigationStore")
  .props({
    greenhouseScreenProps: types.safeReference(GreenhouseModel)
  })
  .actions(self => ({
    setGreenhouseScreenProps (greenhouse: Greenhouse) {
      // Save new greenhouses
      self.greenhouseScreenProps = greenhouse
    }
  }))

type NavigationStoreType = Instance<typeof NavigationStoreModel>
export interface NavigationStore extends NavigationStoreType {}
type NavigationStoreSnapshotType = SnapshotOut<typeof NavigationStoreModel>
export interface NavigationStoreSnapshot extends NavigationStoreSnapshotType {}
export const createNavigationStoreDefaultModel = () => types.optional(NavigationStoreModel, {})
