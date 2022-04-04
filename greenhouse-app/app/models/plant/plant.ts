import { flow, Instance, SnapshotOut, types } from "mobx-state-tree"
import { withRootStore } from ".."
import { RemovePlantResult, UpdatePlantResult } from "../../services/api"
import { PlantApi } from "../../services/api/plant/plant-api"
import { runAuthenticatedApi } from "../../utils/auth-runner"
import { withEnvironment } from "../extensions/with-environment"

/**
 * Greenhouse's plant model
 */
export const PlantModel = types
  .model("Plant")
  .extend(withRootStore)
  .extend(withEnvironment)
  .props({
    id: types.identifierNumber,
    name: types.string,
    description: types.maybe(types.string),
    created_at: types.string,
    greenhouseId: types.maybe(types.string),
    updated_at: types.string
  })
  .actions(self => ({
    updatePlant: flow(function* updatePlant (update: {name: string, description?: string}) {
      const plantApi = new PlantApi(self.environment.api)
      
      const result = yield runAuthenticatedApi<UpdatePlantResult>(
        self.rootStore.authenticationStore,
        plantApi,
        () => {return plantApi.updatePlant(self.id, update)},
      )

      // Create callback handler
      if (result.kind === "ok") {
        self.id = result.plant.id
        self.name = result.plant.name
        self.description = result.plant.description
        self.created_at = result.plant.created_at
        self.updated_at = result.plant.updated_at
      } else {
        __DEV__ && console.tron.log(result.kind)
      }
    })
  }))
  .actions(self => ({
    removePlant: flow(function* removePlant () {
      const plantApi = new PlantApi(self.environment.api)
      const result = yield runAuthenticatedApi<RemovePlantResult>(
        self.rootStore.authenticationStore,
        plantApi,
        () => {return plantApi.removePlant(self.id)},
      )

      // notify in case of error
      if (result.kind !== "ok") {
        __DEV__ && console.tron.log(result.kind)
      }
    })
  }))

type PlantType = Instance<typeof PlantModel>
export interface Plant extends PlantType {}
type PlantSnapshotType = SnapshotOut<typeof PlantModel>
export interface PlantSnapshot extends PlantSnapshotType {}
export const createPlantDefaultModel = () => types.optional(PlantModel, {})
