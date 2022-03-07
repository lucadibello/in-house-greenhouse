import { Instance, SnapshotOut, types, flow } from "mobx-state-tree"
import { Greenhouse } from ".."
import { GreenhouseApi } from "../../services/api/greenhouse/greenhouse-api"
import { withEnvironment } from "../extensions/with-environment"
import { GreenhouseModel } from "../greenhouse/greenhouse"

/**
 * Greenhouses store
 */
export const GreenhouseStoreModel = types
  .model("GreenhouseStore")
  .extend(withEnvironment)
  .props({
    greenhouses: types.optional(types.array(GreenhouseModel), []),
  })
  .actions((self) => ({
    empty () {
      self.greenhouses.replace([])
    }
  }))
  .actions(self => ({
    setGreenhouses (greenhouses: Greenhouse[]) {
      // Save new greenhouses
      self.greenhouses.replace(greenhouses)
    }
  }))
  .actions(self => ({
    getGreenhouses: flow(function* getGreenhouses () {
      const greenhouseApi = new GreenhouseApi(self.environment.api)
      const result = yield greenhouseApi.getGreenhouses()

      if (result.kind === "ok") {
        self.setGreenhouses(result.greenhouses)
      } else {
        __DEV__ && console.tron.log(result.kind)
      }
    }) 
  }))

type GreenhouseStoreType = Instance<typeof GreenhouseStoreModel>
export interface GreenhouseStore extends GreenhouseStoreType {}
type GreenhouseStoreSnapshotType = SnapshotOut<typeof GreenhouseStoreModel>
export interface GreenhouseStoreSnapshot extends GreenhouseStoreSnapshotType {}
export const createGreenhouseStoreDefaultModel = () => types.optional(GreenhouseStoreModel, {})
