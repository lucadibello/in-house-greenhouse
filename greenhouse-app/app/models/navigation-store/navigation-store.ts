import { Instance, SnapshotOut, types } from "mobx-state-tree"
import { Greenhouse, GreenhouseModel } from "../greenhouse/greenhouse"
import { Plant, PlantModel } from "../plant/plant";

/**
 * Model description here for TypeScript hints.
 */
export const NavigationStoreModel = types
  .model("NavigationStore")
  .props({
    greenhouseScreenParams: types.model('GreenhouseScreenParams', {
      greenhouse: types.maybe(types.safeReference(GreenhouseModel)),
    }),
    editPlantScreenParams: types.model('EditPlantScreenParams', {
      plant: types.maybe(types.safeReference(PlantModel)),
    }),
    inspectPlantScreenParams: types.model('InspectPlantScreenParams', {
      plant: types.maybe(types.safeReference(PlantModel)),
    })
  })
  .actions((self) => ({
    setGreenhouseScreenParams (greenhouse: Greenhouse) {
      self.greenhouseScreenParams.greenhouse = greenhouse;
    }
  }))
  .actions((self) => ({
    setEditPlantScreenParams (plant: Plant) {    
      self.editPlantScreenParams.plant = plant;
    }
  }))
  .actions((self) => ({
    setInspectPlantScreenParams (plant: Plant) {
      self.inspectPlantScreenParams.plant = plant;
    }
  }))

type NavigationStoreType = Instance<typeof NavigationStoreModel>
export interface NavigationStore extends NavigationStoreType {}
type NavigationStoreSnapshotType = SnapshotOut<typeof NavigationStoreModel>
export interface NavigationStoreSnapshot extends NavigationStoreSnapshotType {}
export const createNavigationStoreDefaultModel = () => types.optional(NavigationStoreModel, {})
