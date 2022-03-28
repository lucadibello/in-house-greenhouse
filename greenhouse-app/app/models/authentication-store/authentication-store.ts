import { Instance, SnapshotOut, types } from "mobx-state-tree"

/**
 * Authentication model. This model is used to store the authentication state
 */
export const AuthenticationStoreModel = types
  .model("AuthenticationStore")
  .props({
    token: types.optional(types.string, ""),
    user: types.frozen(),
    isAuthenticated: types.optional(types.boolean, false),
  })
  .actions((self) => ({
    // Update the JWT token
    updateToken(token: string) {
      self.token = token
    }
  }))
  .actions((self) => ({
    // Try to login
    login() {
      self.user = {
        // USER WILL BE HERE
      }
      self.isAuthenticated = true
      self.token = "MY_JWT_TOKEN_WILL_BE_HERE"
    },
    // Logout user
    logout() {
      self.user = null
      self.token = ""
      self.isAuthenticated = false
    },
  }))
       

type AuthenticationType = Instance<typeof AuthenticationStoreModel>
export interface Authentication extends AuthenticationType {}
type AuthenticationSnapshotType = SnapshotOut<typeof AuthenticationStoreModel>
export interface AuthenticationSnapshot extends AuthenticationSnapshotType {}
export const createAuthenticationDefaultModel = () => types.optional(AuthenticationStoreModel, {})
