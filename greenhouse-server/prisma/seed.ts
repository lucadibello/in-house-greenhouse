import { Prisma, PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

const rootUsers: Prisma.UserCreateInput[] = [
  {
    name: 'Luca',
    surname: 'Di Bello',
    email: 'info@lucadibello.ch',
    password: 'root'
  },
]

async function main() {
  console.log(`Start seeding ...`)
  for (const u of rootUsers) {
    const user = await prisma.user.create({
      data: u,
    })
    console.log(`Created user with id: ${user.id}`)
  }
  console.log(`Seeding finished.`)
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
