import { enumType } from "nexus";

export const Position = enumType({
  name: 'Position',
  members: [
    'TOP_LEFT',
    'TOP_RIGHT',
    'MIDDLE_LEFT',
    'MIDDLE_RIGHT',
    'BOTTOM_LEFT',
    'BOTTOM_RIGHT',
    'GENERAL'
  ],
})