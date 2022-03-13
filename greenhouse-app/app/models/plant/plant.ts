import { flow, Instance, SnapshotOut, types } from "mobx-state-tree"
import { PlantApi } from "../../services/api/plant/greenhouse-api"
import { withEnvironment } from "../extensions/with-environment"

/**
 * Greenhouse's plant model
 */
export const PlantModel = types
  .model("Plant")
  .extend(withEnvironment)
  .props({
    id: types.integer,
    name: types.string,
    description: types.maybe(types.string),
    created_at: types.string,
    greenhouseId: types.maybe(types.string),
    updated_at: types.string
  })
  .actions(self => ({
    updatePlant: (greenhouseId: string, name: string, description?: string) => flow(function* getGreenhouses () {
      const plantApi = new PlantApi(self.environment.api)
      const result = yield plantApi.addPlant(greenhouseId, name, description);

      if (result.kind === "ok") {
        self.id = result.id
        self.name = "Test"
        self.description = "Description"
        self.created_at = result.created_at
        self.updated_at = result.updated_at
      } else {
        __DEV__ && console.tron.log(result.kind)
      }
    })
  }))

type PlantType = Instance<typeof PlantModel>
export interface Plant extends PlantType {}
type PlantSnapshotType = SnapshotOut<typeof PlantModel>
export interface PlantSnapshot extends PlantSnapshotType {}
export const createPlantDefaultModel = () => types.optional(PlantModel, {})
