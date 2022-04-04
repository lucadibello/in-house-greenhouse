import { Instance, SnapshotOut, types } from "mobx-state-tree"
import { withEnvironment } from "../extensions/with-environment"

/**
 * User model. This model is used to store the user state 
 */
export const UserModel = types
  .model("User")
  .extend(withEnvironment)
  .props({
    id: types.identifier,
    name: types.string,
    email: types.string,
    surname: types.string
  })
  .actions((self) => ({
    // Set swap object
    setUser: (user: User) => {
      self.name = user.name
      self.email = user.email
      self.surname = user.surname
    }
  })) 

type UserType = Instance<typeof UserModel>
export interface User extends UserType {}
type UserSnapshotType = SnapshotOut<typeof UserModel>
export interface UserSnapshot extends UserSnapshotType {}
export const createUserDefaultModel = () => types.optional(UserModel, {})
