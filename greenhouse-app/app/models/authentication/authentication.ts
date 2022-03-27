import { Instance, SnapshotOut, types } from "mobx-state-tree"

/**
 * Model description here for TypeScript hints.
 */
export const AuthenticationModel = types
  .model("Authentication")
  .props({})
  .views((self) => ({})) // eslint-disable-line @typescript-eslint/no-unused-vars
  .actions((self) => ({})) // eslint-disable-line @typescript-eslint/no-unused-vars

type AuthenticationType = Instance<typeof AuthenticationModel>
export interface Authentication extends AuthenticationType {}
type AuthenticationSnapshotType = SnapshotOut<typeof AuthenticationModel>
export interface AuthenticationSnapshot extends AuthenticationSnapshotType {}
export const createAuthenticationDefaultModel = () => types.optional(AuthenticationModel, {})
