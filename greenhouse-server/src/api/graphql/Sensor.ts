import { AuthenticationError } from "apollo-server"
import { extendType, list, objectType } from "nexus"
import { isLoggedIn } from "../../utils/request/authentication"
import { Position, Type } from "./enums"

export const Sensor = objectType({
  name: 'Sensor',
  definition(t) {
    t.nonNull.string('name', { description: "Sensor name" }),
    t.nonNull.field('type', { type: Type , description: "Sensor type"}),
    t.nonNull.field('position', { type: Position, description: "Sensor position"})
  }
})

export const SensorQuery = extendType({
  type: 'Query',
  definition(t) {
    t.list.nonNull.field('sensors', {
      type: Sensor,
      description: 'List of all known sensors',
      resolve(_, args, context) {
        // Check if user is authenticated
        if (!isLoggedIn(context.req)) {
          throw new AuthenticationError('You must be logged in to perform this action')
        }

        return context.prisma.sensor.findMany();
      },
    });
  }
})