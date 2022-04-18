import { enumType } from "nexus";

export const SensorType = enumType({
  name: 'SensorType',
  members: [
    'HUMIDITY',
    'TEMPERATURE',
    'SOIL_MOISTURE',
  ],
})