import { Instance, SnapshotOut, types } from "mobx-state-tree"

/**
 * Authentication model. This model is used to store the authentication state
 */
export const AuthenticationModel = types
  .model("Authentication")
  .props({
    token: types.string,
    user: types.frozen(),
    isAuthenticated: types.boolean,
  })
  .views((self) => ({
    get isAuthenticated() {
      return self.isAuthenticated
    }
  })) 
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
      self.token = null
      self.isAuthenticated = false
    },
  }))
       

type AuthenticationType = Instance<typeof AuthenticationModel>
export interface Authentication extends AuthenticationType {}
type AuthenticationSnapshotType = SnapshotOut<typeof AuthenticationModel>
export interface AuthenticationSnapshot extends AuthenticationSnapshotType {}
export const createAuthenticationDefaultModel = () => types.optional(AuthenticationModel, {})
