import { DataStoreModel } from "./data-store"

test("can be created", () => {
  const instance = DataStoreModel.create({})

  expect(instance).toBeTruthy()
})
