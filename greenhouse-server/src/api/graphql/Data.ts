import { extendType, intArg, nonNull, objectType, stringArg } from "nexus"

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

export const DataQuery = extendType({
  type: 'Query',
  definition(t) {
    // List all data for a certain greenhouse
    t.list.nonNull.field('getData', {
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
    t.list.nonNull.field('getDataByPlant', {
      type: 'Data',
      description: 'List of all data related to a certain plant',
      args: {
        plantId: nonNull(intArg({
          description: "Plant ID"
        })),
      },
      async resolve(_, args, context) {
        // Fetch information related to the plant
        const plant = await context.prisma.plant.findFirst({
          where: { id: args.plantId }
        });

        // Check if plant exists
        if (plant !== null && plant.greenhouseId !== null) {
          // Find sensor with the same position as the plant
          const sensor = await context.prisma.sensor.findFirst({
            where: { position: plant.position }
          });
          
          if (sensor !== null) {
            // Fetch data related to the plant and greenhouse
            return context.prisma.data.findMany({
              where: {
                greenhouseId: plant.greenhouseId,
                sensor: sensor.name
              }
            });
          } else {
            return null
          }
        } else {
          return null
        }
      }
    });
  }
})