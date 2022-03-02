import { applySnapshot, Instance, SnapshotOut, types } from "mobx-state-tree"
import { withEnvironment } from "../extensions/with-environment";
import { GreenhouseModel, GreenhouseSnapshot } from "../greenhouse/greenhouse";
import { GreenhouseApi } from "../../services/api/greenhouse/greenhouse-api"

/**
 * Greenhouse store. Will contain all registered greenhouses
 */
 export const GreenhouseStoreModel = types
 .model("GreenhouseStore")
 .props({
   greenhouses: types.array(GreenhouseModel)
 })
 .extend(withEnvironment)
 .actions((self) => ({
    saveGreenhouses: (greenhouseSnapshots: GreenhouseSnapshot[]) => {
      console.tron.log("Replacing greenhouse snapshot with new ones...", greenhouseSnapshots)
      // Apply snapshot
      applySnapshot(self.greenhouses, greenhouseSnapshots)
    }
 }))
 .actions((self) => ({
    getGreenhouses: async () => {
      console.tron.log("Get greenhouses from greenhouse-store", self)
      const greenhouseApi = new GreenhouseApi(self.environment.api)
      const result = await greenhouseApi.getGreenhouses()
      
      if (result.kind === "ok") {
        console.tron.log("RECEIVED GREENHOUSES FROM APIs: ", result)
        // FIXME: self.saveGreenhouses(result.data)
      } else {
        __DEV__ && console.tron.log(result.kind)
      }
    }
 }))

type GreenhouseStoreType = Instance<typeof GreenhouseStoreModel>
export interface GreenhouseStore extends GreenhouseStoreType {}
type GreenhouseStoreSnapshotType = SnapshotOut<typeof GreenhouseStoreModel>
export interface GreenhouseStoreSnapshot extends GreenhouseStoreSnapshotType {}
export const createGreenhouseStoreDefaultModel = () => types.optional(GreenhouseStoreModel, {})
