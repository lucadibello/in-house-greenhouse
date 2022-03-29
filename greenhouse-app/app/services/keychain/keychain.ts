import * as SecureStore from 'expo-secure-store';

// Interface that describes an error type and message
export interface IKeyChainError {
  success: boolean;
  type: string;
}

export interface IKeyChainData extends IKeyChainError {
  email: string;
  password: string;
}

export class Keychain {
  private server: string

  // It is used to store the credentials of the user in the app.
  //
  // @param server The server which has these creds 
  constructor(server: string) {
    this.server = server
  }

  // Saves some credentials securely.
  //
  // @param email The Email
  // @param password The password
  // @param server The server these creds are for.
  async save(email: string, password: string): Promise<IKeyChainError> {
    // check if creds are saved
    if (await SecureStore.isAvailableAsync()) {
      try {
        // Check if parameters are not empty
        if (email === "" || password === "") {
          return {
            success: false,
            type: "KEYCHAIN_CREDENTIALS_EMPTY_ERROR",
          }
        }

        // Await util data is saved
        await SecureStore.setItemAsync(this.server, JSON.stringify({email, password}))

        // Return success
        return {
          success: true,
          type: "KEYCHAIN_SUCCESS"
        }
      } catch (e) {
        // Return error, keychain returned an error
        console.log(e)
        return {
          success: false,
          type: "KEYCHAIN_ERROR",
        }
      }
    } else {
      // Return error, keychain is not available
      return {
        success: false,
        type: "KEYCHAIN_NOT_AVAILABLE",
      }
    }
  }


  async load(): Promise<IKeyChainData> {
    // check if creds are saved
    if (await SecureStore.isAvailableAsync()) {
      try {
        // Await util data is saved
        const credentialJsonString = await SecureStore.getItemAsync(this.server)
        const credentialJson: {email: string, password: string} = JSON.parse(credentialJsonString)

        // Return success
        return {
          password: credentialJson.password,
          email: credentialJson.email,
          success: true,
          type: "KEYCHAIN_SUCCESS"
        }
      } catch (e) {
        // Return error, keychain returned an error
        console.log(e)
        return {
          success: false,
          type: "KEYCHAIN_ERROR",
          email: "",
          password: ""
        }
      }
    } else {
      // Return error, keychain is not available
      return {
        success: false,
        type: "KEYCHAIN_NOT_AVAILABLE",
        email: "",
        password: ""
      }
    }
  }
}
