import { DataModel } from "./data"

test("can be created", () => {
  const instance = DataModel.create({})

  expect(instance).toBeTruthy()
})
