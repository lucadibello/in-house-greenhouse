import { PrismaClient } from '@prisma/client'
import { ExpressContext } from 'apollo-server-express'

export interface Context {
  prisma: PrismaClient,
  req: ExpressContext
}

const prisma = new PrismaClient()

export const context = (req: ExpressContext): Context => ({
  prisma: prisma,
  req: req
})