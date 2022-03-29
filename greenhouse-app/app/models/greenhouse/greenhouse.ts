import { flow, Instance, SnapshotOut, types } from "mobx-state-tree"
import { PlantApi } from "../../services/api/plant/greenhouse-api"
import { withEnvironment } from "../extensions/with-environment"
import { PlantModel } from "../plant/plant"

const PlantsArray = types.array(PlantModel)

/**
 * Model description here for TypeScript hints.
 */
export const GreenhouseModel = types
  .model("Greenhouse")
  .extend(withEnvironment)
  .props({
    id: types.identifier,
    name: types.string,
    description: types.maybeNull(types.string),
    isOkay: types.boolean,
    plants: PlantsArray,
    created_at: types.string,
    updated_at: types.string
  })
  .actions(self => ({
    addPlant: flow(function* addPlant (update: {name: string, description?: string}) {
      const plantApi = new PlantApi(self.environment.api)
      const result = yield plantApi.addPlant(self.id, update);
      
      // Update model data
      if (result.kind === "ok") {
        self.plants.push(result.plant)
      } else {
        __DEV__ && console.tron.log(result.kind)
      }
    })
  }))

type GreenhouseType = Instance<typeof GreenhouseModel>
export interface Greenhouse extends GreenhouseType {}
type GreenhouseSnapshotType = SnapshotOut<typeof GreenhouseModel>
export interface GreenhouseSnapshot extends GreenhouseSnapshotType {}
export const createGreenhouseDefaultModel = () => types.optional(GreenhouseModel, {})
