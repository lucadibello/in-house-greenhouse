import { enumType } from "nexus";

export const Type = enumType({
  name: 'Type',
  members: [
    'HUMIDITY',
    'TEMPERATURE',
    'SOIL_MOISTURE',
  ],
})