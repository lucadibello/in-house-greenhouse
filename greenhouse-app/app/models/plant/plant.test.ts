import { PlantModel } from "./plant"

test("can be created", () => {
  const instance = PlantModel.create({})

  expect(instance).toBeTruthy()
})
