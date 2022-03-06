import { NavigationStoreModel } from "./navigation-store"

test("can be created", () => {
  const instance = NavigationStoreModel.create({})

  expect(instance).toBeTruthy()
})
