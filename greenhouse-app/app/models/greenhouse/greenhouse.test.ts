import { GreenhouseModel } from "./greenhouse"

test("can be created", () => {
  const instance = GreenhouseModel.create({})

  expect(instance).toBeTruthy()
})
