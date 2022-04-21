import { PositionStoreModel } from "./position-store"

test("can be created", () => {
  const instance = PositionStoreModel.create({})

  expect(instance).toBeTruthy()
})
