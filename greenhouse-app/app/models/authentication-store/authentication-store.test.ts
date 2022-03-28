import { AuthenticationStoreModel } from "./authentication-store"

test("can be created", () => {
  const instance = AuthenticationStoreModel.create({})

  expect(instance).toBeTruthy()
})
