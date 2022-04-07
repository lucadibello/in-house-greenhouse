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
    position: 'TOP_LEFT'
  },
  {
    position: 'TOP_RIGHT'
  },
  {
    position: 'MIDDLE_LEFT'
  },
  {
    position: 'MIDDLE_RIGHT'
  },
  {
    position: 'BOTTOM_LEFT'
  },
  {
    position: 'BOTTOM_RIGHT'
  },
  {
    position: 'GENERAL'
  },
]

const sensorTypes: Prisma.TypeCreateInput[] = [
  {
    code: "SOIL_MOISTURE"
  },
  {
    code: "HUMIDITY"
  },
  {
    code: "TEMPERATURE"
  },
  {
    code: "CAMERA"
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

  // Create default positions
  console.log("\n-- ADDING DEFAULT POSITIONS --")
  for (const p of positions) {
    const position = await prisma.position.create({
      data: p,
    })
    console.log(`Created position with code: ${position.position}`)
  }

  // Create default sensor types
  console.log("\n-- ADDING DEFAULT SENSOR TYPES --")
  for (const t of sensorTypes) {
    const type = await prisma.type.create({
      data: t,
    })
    console.log(`Created sensor type with code: ${type.code}`)
  }

  // Add default sensors
  console.log("\n-- ADDING DEFAULT SENSORS --")
  for (const s of sensors) {
    const sensor = await prisma.sensor.create({
      data: s
    })
    console.log(`Created position with code: ${sensor.name}`)
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
