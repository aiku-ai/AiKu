import { Presets } from '~/models/strapi'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export default defineEventHandler(async () => {
  return await prisma.preset.findMany() 
})

