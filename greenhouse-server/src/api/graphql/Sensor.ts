import { AuthenticationError } from "apollo-server"
import { extendType, list, objectType } from "nexus"
import { isLoggedIn } from "../../utils/request/authentication"
import { PositionType, SensorType } from "./enums"
import { Position } from "./Position"

export const Sensor = objectType({
  name: 'Sensor',
  definition(t) {
    t.nonNull.string('name', { description: "Sensor name" }),
    t.nonNull.field('type', { type: SensorType , description: "Sensor type"}),
    t.nonNull.field('positionType', { type: PositionType, description: "Sensor position"})
    t.field('position', {
      type: Position,
      resolve: (parent, _, ctx) => {
        return ctx.prisma.position.findUnique({
          where: { type: parent.positionType },
        })
      },
    });
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
          if (!isLoggedIn(context.req, true)) {
            throw new AuthenticationError('You must send a valid greenhouse temporary token')
          }
        }

        return context.prisma.sensor.findMany();
      },
    });
  }
})