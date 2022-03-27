import { AuthenticationModel } from "./authentication"

test("can be created", () => {
  const instance = AuthenticationModel.create({})

  expect(instance).toBeTruthy()
})
