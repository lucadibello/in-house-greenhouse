import { Instance, SnapshotOut, types, flow } from "mobx-state-tree"
import { Api } from "../../services/api";
import { AuthenticationApi } from "../../services/api/authentication/authentication-api";
import { IKeyChainData } from "../../services/keychain/keychain";
import { withEnvironment } from "../extensions/with-environment";


/**
 * Function to set authentication header to API 
 */
const addAuthorizationHeaderToApi = (api: Api, accessToken: string) => {
  api.apisauce.setHeader("Authorization", `${accessToken}`)
}

/**
 * Authentication model. This model is used to store the authentication state
 */
export const AuthenticationStoreModel = types
  .model("AuthenticationStore")
  .extend(withEnvironment)
  .props({
    accessToken: types.optional(types.string, ""),
    refreshToken: types.optional(types.string, ""),
    user: types.optional(types.string, "{IMPLEMENT ME PLEASE}"),
    isAuthenticated: types.optional(types.boolean, false),
  })
  .actions((self) => ({
    logout() {
      self.accessToken = ""
      self.refreshToken = ""
      self.isAuthenticated = false
    },
  }))
  .actions(self => ({
    login: flow(function* login (email: string, password: string, onErrorCallback: (error: {errorCode: string, errorMessage: string}) => void) {
      // Send login request using AuthenticationApi
      const authenticationApi = new AuthenticationApi(self.environment.api)
      const result = yield authenticationApi.login(email, password)
      
      // Check response
      if (result.kind === "ok") {
        // Success. Update the token and user
        // TODO: self.user = null
        self.accessToken = result.token
        self.refreshToken = result.refreshToken
        self.isAuthenticated = true

        // Set authorization header to API
        addAuthorizationHeaderToApi(self.environment.api, self.accessToken)

        // Save data to keychain using KeychainService
        self.environment.keychain.save(email, password).then((status) => {
          // check keychain result status and notify via tron
          if (status.success) {
            console.tron.debug("Keychain save success")
          } else {
            console.tron.error("Cannot credentials via keychain: ", JSON.stringify(status))
          }
        })
      } else {
        // Log error to tron console if in debug mode
        __DEV__ && console.tron.log(result.kind)

        // call onErrorCallback function to notify user that the login failed
        onErrorCallback({errorCode: result.errorCode, errorMessage: result.errorMessage})
      }
    }) 
  }))
  .actions(self => ({
    register: flow(function* register (name: string, surname: string, email: string, password: string, onErrorCallback?: (error: {errorCode: string, errorMessage: string}) => void) {
      // Send register request using AuthenticationApi
      const authenticationApi = new AuthenticationApi(self.environment.api)
      const result = yield authenticationApi.register(name, surname, email, password)

      // Check response
      if (result.kind === "ok") {
        // Success. Update the token and user
        self.accessToken = result.token
        self.refreshToken = result.refreshToken
        self.isAuthenticated = true

        // Set authorization header to API
        addAuthorizationHeaderToApi(self.environment.api, self.accessToken)
      } else {
        // Log error to tron console if in debug mode
        __DEV__ && console.tron.log(result.kind)
        
        if (onErrorCallback) {
          // call onErrorCallback function to notify user that the login failed
          onErrorCallback({errorCode: result.errorCode, errorMessage: result.errorMessage})
        }
      }
    })
  }))
  .actions(self => ({
    // Refresh token
    requestNewTokens: flow(function* requestNewTokens (
      onErrorCallback?: (error: {errorCode: string, errorMessage: string}) => void,
      onSuccessCallback?: (newContext: Api) => void
    ) {
      // Send refresh token request using AuthenticationApi
      const authenticationApi = new AuthenticationApi(self.environment.api)
      const result = yield authenticationApi.refreshToken(self.refreshToken)

      // Check response
      if (result.kind === "ok") {
        // Success. Update the token and user
        self.accessToken = result.token
        self.refreshToken = result.refreshToken
        
        // Set authorization header to environment API service
        addAuthorizationHeaderToApi(self.environment.api, self.accessToken)

        // If onSuccessCallback is defined, call it
        if (onSuccessCallback) {
          onSuccessCallback(self.environment.api)
        }
      } else {
        // Log error to tron console if in debug mode
        __DEV__ && console.tron.log(result.kind)

        if (onErrorCallback) {
          // call onErrorCallback function to notify user that the login failed
          onErrorCallback({errorCode: result.errorCode, errorMessage: result.errorMessage})
        }
      }
    })
  }))
  .actions(self => ({
    loadCredentials: flow(function* loadCredentials (callback: (response: IKeyChainData) => void) {
      // Try to load data from keychain
      const keychainData = yield self.environment.keychain.load()
      // callback with data
      callback(keychainData)
    })
  }))

type AuthenticationType = Instance<typeof AuthenticationStoreModel>
export interface Authentication extends AuthenticationType {}
type AuthenticationSnapshotType = SnapshotOut<typeof AuthenticationStoreModel>
export interface AuthenticationSnapshot extends AuthenticationSnapshotType {}
export const createAuthenticationDefaultModel = () => types.optional(AuthenticationStoreModel, {})
