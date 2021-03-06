import { AuthenticationError, UserInputError } from "apollo-server"
import { arg, extendType, floatArg, intArg, nonNull, objectType, stringArg } from "nexus"
import { isLoggedIn } from "../../utils/request/authentication"

export const Data = objectType({
  name: 'Data',
  definition(t) {
    t.nonNull.int("id", { description: "Data record ID" }),
    t.nonNull.string('sensor', { description: "Sensor name"}),
    t.nonNull.float('value', { description: "Sensor value"}),
    t.nonNull.string('greenhouseId', { description: "Greenhouse ID"}),
    t.nonNull.field('created_at', { type: "dateTime", description: "Data record creation date"}),
    t.nonNull.field('updated_at', { type: "dateTime", description: "Data record update date"})
  }
})

export const DataMutation = extendType({
  type: 'Mutation',
  definition(t) {
    t.field('recordData', {
      type: 'Data',
      description: 'Record data from a sensor',
      args: {
        sensor: nonNull(stringArg({
          description: 'Sensor name'
        })),
        value: nonNull(floatArg({
          description: 'Sensor value'
        })),
        greenhouseId: nonNull(stringArg({
          description: 'Greenhouse ID'
        }))
      },
      resolve: async (_, args, context) => {
        // Check if user is authenticated using access token or greenhouse's temporary token
        if (!isLoggedIn(context.req)) {
          if (!isLoggedIn(context.req, true)) {
            throw new AuthenticationError('You must send a valid greenhouse temporary token')
          }
        }

        // Save data inside database only if in the passed greenhouse (fetched using greenhouseId) there are plants in the same
        // position as the sensor
        const greenhouse = await context.prisma.greenhouse.findFirst({
          where: {
            id: args.greenhouseId
          }
        })
        // check if greenhouse exists
        if (!greenhouse) {
          throw new UserInputError('No greenhouse found with the given ID')
        }

        // Get sensor from database
        const sensor = await context.prisma.sensor.findFirst({
          where: {
            name: args.sensor
          }
        })
        // check if sensor exists
        if (!sensor) {
          throw new UserInputError('No sensor found with the given name')
        }

        // check if there is at least a plant in the greenhouse in the same position as the sensor
        const plant = await context.prisma.plant.findFirst({
          where: {
            greenhouseId: args.greenhouseId,
            positionType: sensor.positionType,
            isDeleted: false
          }
        })

        // Save data inside database only if at least a plant has been retrived
        if (plant) {
          // Save data inside DB
          return context.prisma.data.create({
            data: {
              sensor: args.sensor,
              value: args.value,
              greenhouseId: args.greenhouseId
            }
          })
        } else {
          throw new UserInputError('No plant found in the same position as the sensor');
        }
      }
    })
  }
})


export const DataQuery = extendType({
  type: 'Query',
  definition(t) {
    // List all data for a certain greenhouse
    t.list.field('getData', {
      type: 'Data',
      description: 'List of all data related to a certain greenhouse',
      args: {
        greenhouseId: nonNull(stringArg({
          description: "Greenhouse UUID"
        })),
      },
      resolve(_, args, context) {
        return context.prisma.data.findMany({
          where: { greenhouseId: args.greenhouseId }
        });
      },
    });

    // List all data for a certain Plant
    t.list.field('getDataByPlant', {
      type: 'Data',
      description: 'List of all data related to a certain plant',
      args: {
        plantId: nonNull(intArg({
          description: "Plant ID"
        })),
        sensorType: arg({
          type: 'SensorType',
          description: "Type of sensor data to be retrieved",
        })
      },
      async resolve(_, args, context) {
        // Fetch information related to the plant
        const plant = await context.prisma.plant.findFirst({
          where: { 
            id: args.plantId
          }
        });

        // Check if plant exists
        if (plant !== null && plant.greenhouseId !== null) {
          // Find sensors with the same position as the plant with a specified type
          const sensors = await context.prisma.sensor.findMany({
            where: {
              positionType: plant.positionType,
              type: args.sensorType || undefined
            }
          });
        
          // Check if sensor was found
          if (sensors.length > 0) {
            // Fetch data related to the plant and greenhouse (maximum 1000 rows)
            return context.prisma.data.findMany({
              where: {
                greenhouseId: plant.greenhouseId,
                sensor: { in: sensors.map(s => s.name) }
              },
              orderBy: { created_at: 'desc' },
              take: 500 
            });
          } else {
            if (args.sensorType) {
              throw new UserInputError("Cannot find any sensor " +
                " with the specified type at the same position as the plant")
            } else {
              throw new UserInputError("Cannot find any sensor with the same position as the plant")
            }
          }
        } else {
          throw new UserInputError("Plant not found")
        }
      }
    });
  }
})
