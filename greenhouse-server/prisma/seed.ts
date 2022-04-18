import { Prisma, PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

const rootUsers: Prisma.UserCreateInput[] = [
  {
    name: 'Luca',
    surname: 'Di Bello',
    email: 'info@lucadibello.ch',
    password: '$2a$12$Y5OwOOzbDjwVCcIklFefY.2Iad8F77HEyhg4vC3feqHuMIJrryHe2'
  },
]

const positions: Prisma.PositionCreateInput[] = [
  {
    name: 'Top Left',
    type: 'TOP_LEFT'
  },
  {
    name: 'Top Right',
    type: 'TOP_RIGHT'
  },
  {
    name: 'Middle Left',
    type: 'MIDDLE_LEFT'
  },
  {
    name: 'Middle Right',
    type: 'MIDDLE_RIGHT'
  },
  {
    name: 'Bottom Left',
    type: 'BOTTOM_LEFT'
  },
  {
    name: 'Bottom Right',
    type: 'BOTTOM_RIGHT'
  },
  {
    name: 'Global',
    type: 'GENERAL'
  }
]

const sensors: Prisma.SensorUncheckedCreateInput[] = [
  {
    name: 'HUMIDITY_SENSOR',
    type: 'HUMIDITY',
    position: 'GENERAL',
  },
  {
    name: 'TEMPERATURE_SENSOR',
    type: 'TEMPERATURE',
    position: 'GENERAL',
  },
  {
    name: 'SOIL_SENSOR_1',
    type: 'SOIL_MOISTURE',
    position: 'TOP_LEFT',
  },
  {
    name: 'SOIL_SENSOR_2',
    type: 'SOIL_MOISTURE',
    position: 'TOP_RIGHT',
  },
  {
    name: 'SOIL_SENSOR_3',
    type: 'SOIL_MOISTURE',
    position: 'MIDDLE_LEFT',
  },
  {
    name: 'SOIL_SENSOR_4',
    type: 'SOIL_MOISTURE',
    position: 'MIDDLE_RIGHT',
  },
  {
    name: 'SOIL_SENSOR_5',
    type: 'SOIL_MOISTURE',
    position: 'BOTTOM_LEFT',
  },
  {
    name: 'SOIL_SENSOR_6',
    type: 'SOIL_MOISTURE',
    position: 'BOTTOM_RIGHT',
  },
]

async function main() {
  console.log(`Start seeding ...`)

  // Create users
  console.log("\n-- CREATING USERS --")
  for (const u of rootUsers) {
    const user = await prisma.user.create({
      data: u,
    })
    console.log(`Created user with id: ${user.id}`)
  }

  // Add default positions
  console.log("\n-- ADDING DEFAULT POSITIONS --")
  for (const p of positions) {
    const position = await prisma.position.create({
      data: p
    })
    console.log(`Creaated position with name: ${position.name}`)
  }

  // Add default sensors
  console.log("\n-- ADDING DEFAULT SENSORS --")
  for (const s of sensors) {
    const sensor = await prisma.sensor.create({
      data: s
    })
    console.log(`Created sensor with code: ${sensor.name} at position: ${sensor.position}`)
  }

  // Notify seeding finished
  console.log(`\n\n [!] Seeding finished.`)
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
