import { PositionModel } from "./position"

test("can be created", () => {
  const instance = PositionModel.create({})

  expect(instance).toBeTruthy()
})
