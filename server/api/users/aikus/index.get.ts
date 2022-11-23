import { Presets } from '~/models/strapi'
import { PrismaClient } from '@prisma/client'
import { serverSupabaseUser } from '#supabase/server'

const prisma = new PrismaClient()


/**
  * This endpoint returns all AiKus for an authenticated User
**/
export default defineEventHandler(async (event) => {
  const user = await serverSupabaseUser(event)
  if (!user) {
    throw createError({ statusCode: 401, message: 'Unauthorized' })
  }

  console.log(user.id)

  return await prisma.aiku.findMany({
    where: {
      userId: user.id
    }
  }) 
})

