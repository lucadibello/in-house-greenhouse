import { GreenhouseStoreModel } from "./greenhouse-store"

test("can be created", () => {
  const instance = GreenhouseStoreModel.create({})

  expect(instance).toBeTruthy()
})
