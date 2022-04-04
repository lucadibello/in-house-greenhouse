import { SnapshotOut, types } from "mobx-state-tree"
import { Authentication, AuthenticationStoreModel } from "../authentication-store/authentication-store"
import { GreenhouseStore, GreenhouseStoreModel } from "../greenhouse-store/greenhouse-store"
import { NavigationStore, NavigationStoreModel } from "../navigation-store/navigation-store"

/**
 * A RootStore model.
 */
export const RootStoreModel = types.model("RootStore").props({
  greenhouseStore: types.optional(GreenhouseStoreModel, {} as any),
  navigationStore: types.optional(NavigationStoreModel, {
    greenhouseScreenParams: {
      greenhouse: undefined
    },
    editPlantScreenParams: {
      plant: undefined
    }
  } as any),
  authenticationStore: types.optional(AuthenticationStoreModel, {} as any)
})

/**
 * The RootStore instance.
 */
export interface RootStore {
  greenhouseStore: GreenhouseStore
  navigationStore: NavigationStore
  authenticationStore: Authentication
}

/**
 * The data of a RootStore.
 */
export interface RootStoreSnapshot extends SnapshotOut<typeof RootStoreModel> {}
