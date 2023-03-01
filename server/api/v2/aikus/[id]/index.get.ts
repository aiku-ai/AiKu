import { PrismaClient } from '@prisma/client'
import type { aiku, users } from '@prisma/client'

const prisma = new PrismaClient()

/**
  * This endpoint returns an AiKu by id
**/
export default defineEventHandler(async (event) => {
  const aikuId = event.context.params.id

  const aiku = await getAiku(aikuId)
  if (!aiku) {
    throw createError({ statusCode: 404, statusMessage: "AiKu could not be found" })
  }

  return aiku
})

const getAiku = async (aikuId: string) => {
  return await prisma.aiku.findUnique({
    where: {
      id: aikuId
    }
  })
}
