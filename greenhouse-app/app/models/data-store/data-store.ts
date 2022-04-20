import { flow, Instance, SnapshotOut, types } from "mobx-state-tree"
import { Plant } from ".."
import { GetPlantDataResult } from "../../services/api"
import { SensorType } from "../../services/api/core/types/api.data.types"
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
      const dataApi = new DataApi(self.environment.api)
      const result = yield runAuthenticatedApi<GetPlantDataResult>(
        self.rootStore.authenticationStore,
        dataApi,
        () => dataApi.getPlantData(plant, SensorType.SOIL)
      )
      
      // Set data
      if (result.kind === "ok") {
        self.data.replace(result.data)
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
