import { useValidatedBody, z } from 'h3-zod'
import { PrismaClient } from '@prisma/client'
import { serverSupabaseUser } from '#supabase/server'
// import { v4 as uuidv4 } from 'uuid';
// import { FormData } from 'formdata-node'

const prisma = new PrismaClient()
const config = useRuntimeConfig()

export default defineEventHandler(async (event) => {
  const user = await serverSupabaseUser(event)
  if (!user) {
    throw createError({ statusCode: 401, message: 'Unauthorized' })
  }

  const body = await useValidatedBody(event, z.object({
    lineOne: z.string(),
    lineTwo: z.string(),
    lineThree: z.string(),
    sdUrl: z.string(),
    presetId: z.number().nullable().optional()
  }))
  
  await prisma.aiku.create({
    data: {
      createdAt: new Date(),
      lineOne: body.lineOne,
      lineTwo: body.lineTwo,
      lineThree: body.lineThree,
      userId: user.id,
      sdUrl: body.sdUrl,
      presetId: body.presetId
    }
  })

  return event.res.end()
})

