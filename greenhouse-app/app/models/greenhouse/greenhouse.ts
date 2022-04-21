import { flow, Instance, SnapshotOut, types } from "mobx-state-tree"
import { AddPlantResult } from "../../services/api/core/types/api.result.types"
import { PlantApi } from "../../services/api/plant/plant-api"
import { runAuthenticatedApi } from "../../utils/auth-runner"
import { withEnvironment } from "../extensions/with-environment"
import { withRootStore } from "../extensions/with-root-store"
import { PlantModel } from "../plant/plant"
import { Position } from "../position/position"

/**
 * Model description here for TypeScript hints.
 */
export const GreenhouseModel = types
  .model("Greenhouse")
  .extend(withRootStore)
  .extend(withEnvironment)
  .props({
    id: types.identifier,
    name: types.string,
    description: types.maybeNull(types.string),
    isOkay: types.boolean,
    plants: types.array(PlantModel),
    created_at: types.string,
    updated_at: types.string
  })
  .actions(self => ({
    addPlant: flow(function* addPlant (update: {name: string, description?: string, position: Position}) {
      const plantApi = new PlantApi(self.environment.api)
      const result = yield runAuthenticatedApi<AddPlantResult>(
        self.rootStore.authenticationStore,
        plantApi,
        () => {return plantApi.addPlant(self.id, update)} // Anonymous function
      )

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
