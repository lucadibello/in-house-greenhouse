import { Instance, SnapshotOut, types, flow, destroy } from "mobx-state-tree"
import { Greenhouse } from ".."
import { GreenhouseApi } from "../../services/api/greenhouse/greenhouse-api"
import { withEnvironment } from "../extensions/with-environment"
import { GreenhouseModel } from "../greenhouse/greenhouse"
import { Plant } from "../plant/plant"

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
  .actions(() => ({
    removePlant (item: Plant) {
      // remove plant from DB
      item.removePlant()
      // remove plant from state tree
      destroy(item)
    }
  }))

type GreenhouseStoreType = Instance<typeof GreenhouseStoreModel>
export interface GreenhouseStore extends GreenhouseStoreType {}
type GreenhouseStoreSnapshotType = SnapshotOut<typeof GreenhouseStoreModel>
export interface GreenhouseStoreSnapshot extends GreenhouseStoreSnapshotType {}
export const createGreenhouseStoreDefaultModel = () => types.optional(GreenhouseStoreModel, {})
