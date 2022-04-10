import { flow, Instance, SnapshotOut, types } from "mobx-state-tree"
import { GetPositionsResult } from "../../services/api/core/types/api.result.types"
import { PositionApi } from "../../services/api/position/position-api"
import { runAuthenticatedApi } from "../../utils/auth-runner"
import { withEnvironment } from "../extensions/with-environment"
import { withRootStore } from "../extensions/with-root-store"
import { PositionModel } from "../position/position"

/**
 * Model description here for TypeScript hints.
 */
export const PositionStoreModel = types
  .model("PositionStore")
  .extend(withRootStore)
  .extend(withEnvironment)
  .props({
    positions: types.optional(types.array(PositionModel), []),
  })
  .actions((self) => ({
    getPositions: flow(function* getPositions () {
      const positionApi = new PositionApi(self.environment.api)
      const result = yield runAuthenticatedApi<GetPositionsResult>(
        self.rootStore.authenticationStore,
        positionApi,
        positionApi.getPositions
      )

      // Set data
      if (result.kind === "ok") {
        self.positions.replace(result.positions)
      } else {
        __DEV__ && console.tron.log(result.kind)
      }
    })
  }))

type PositionStoreType = Instance<typeof PositionStoreModel>
export interface PositionStore extends PositionStoreType {}
type PositionStoreSnapshotType = SnapshotOut<typeof PositionStoreModel>
export interface PositionStoreSnapshot extends PositionStoreSnapshotType {}
export const createPositionStoreDefaultModel = () => types.optional(PositionStoreModel, {})
