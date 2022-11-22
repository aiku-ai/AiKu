import { PrismaClient, aiku } from '@prisma/client'

const prisma = new PrismaClient()

/**
  * This endpoint returns an AiKu by id
**/
export default defineEventHandler(async (event) => {
  const aikuId = event.context.params.id
  const body = await readBody(event) as aiku


  await prisma.aiku.update({
    where: {
      id: body.id
    },
    data: body
  })

  event.node.res.end()
})

const getAiku = async (aikuId: string) => {
  return await prisma.aiku.findUnique({
    where: {
      id: aikuId
    }
  })
}
