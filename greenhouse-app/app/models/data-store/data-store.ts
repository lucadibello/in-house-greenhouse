import { flow, Instance, SnapshotOut, types } from "mobx-state-tree"
import { Plant } from ".."
import { GetPlantDataResult } from "../../services/api"
import { DataApi } from "../../services/api/data/data-api"
import { runAuthenticatedApi } from "../../utils/auth-runner"
import { DataModel } from "../data/data"
import { withEnvironment } from "../extensions/with-environment"
import { withRootStore } from "../extensions/with-root-store"

/**
 * Model description here for TypeScript hints.
 */
export const DataStoreModel = types
  .model("DataStore")
  .extend(withEnvironment)
  .extend(withRootStore)
  .props({
    data: types.optional(types.array(DataModel), []),
  })
  .actions((self) => ({
    getPlantData: flow(function* getPositions (plant: Plant) {
      const positionApi = new DataApi(self.environment.api)
      const result = yield runAuthenticatedApi<GetPlantDataResult>(
        self.rootStore.authenticationStore,
        positionApi,
        () => positionApi.getPlantData(plant)
      )
      
      console.log("PLANT DATA: ", result)

      // Set data
      if (result.kind === "ok") {
        self.data.replace(result.positions)
      } else {
        __DEV__ && console.tron.log(result.kind)
      }
    })
  })) 

type DataStoreType = Instance<typeof DataStoreModel>
export interface DataStore extends DataStoreType {}
type DataStoreSnapshotType = SnapshotOut<typeof DataStoreModel>
export interface DataStoreSnapshot extends DataStoreSnapshotType {}
export const createDataStoreDefaultModel = () => types.optional(DataStoreModel, {})
