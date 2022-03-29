import { Instance, SnapshotOut, types } from "mobx-state-tree"
import { AuthenticationStoreModel } from "../authentication-store/authentication-store"
import { GreenhouseStoreModel } from "../greenhouse-store/greenhouse-store"
import { NavigationStoreModel } from "../navigation-store/navigation-store"

/**
 * A RootStore model.
 */
// prettier-ignore
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
export interface RootStore extends Instance<typeof RootStoreModel> {}

/**
 * The data of a RootStore.
 */
export interface RootStoreSnapshot extends SnapshotOut<typeof RootStoreModel> {}
