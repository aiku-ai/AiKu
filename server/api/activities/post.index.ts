import { useValidatedBody, z } from 'h3-zod'
import { PrismaClient } from '@prisma/client'
import { serverSupabaseUser } from '#supabase/server'
import { v4 as uuidv4 } from 'uuid';

const prisma = new PrismaClient()


/**
 * Create a new activity record
**/
export default defineEventHandler(async (event) => {
  // validate body
  const body = await useValidatedBody(event, z.object({
    aikuId: z.string(),
    activityType: z.enum(["view", "like", "share"]),
  }))

  // get user
  // NOTE: user may be null. we want to be able to track views
  const user = await serverSupabaseUser(event)

  // if activity type is not a view and there is no authed user, then we throw error
  if (body.activityType !== 'view' && !user) {
    throw createError({ statusCode: 401, message: 'Unauthorized' })
  }

  await prisma.aikuActivity.create({
    data: {
      id: uuidv4(),
      aikuId: body.aikuId,
      activityUserId: user?.id ? user.id:null,
      activityType: body.activityType
    }
  })

  event.node.res.end()
})

