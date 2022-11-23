import { useValidatedQuery, z } from 'h3-zod';
import { PrismaClient } from '@prisma/client'
import { serverSupabaseUser } from '#supabase/server'
import { User } from '@supabase/supabase-js';
import { H3Event } from 'h3'
import { aiku } from '../../../../node_modules/.prisma/client/index'

const prisma = new PrismaClient()

type GetAikusByUserResp = {
  data: aiku[],
  meta: Meta
}

type Meta = {
  totalCount: number
}

/**
  * This endpoint returns all AiKus for an authenticated User
**/
export default defineEventHandler(async (event):Promise<GetAikusByUserResp> => {
  const user = await serverSupabaseUser(event)
  if (!user) {
    throw createError({ statusCode: 401, message: 'Unauthorized' })
  }

  const query = useValidatedQuery(event, z.object({
    cursor: z.string(),
    orderDir: z.enum(["asc", "desc"]),
    pageNum: z.string()
  }))

  console.log(query)

  let aikus:aiku[];

  if(query.cursor && query.pageNum) {
    aikus = await getAikusCursorAsync(query, user)
  } else {
    aikus = await getAikusAsync(query, user)
  }

  const numAikus:number = await getAikusCount(user)

  return {
    data: aikus,
    meta: {
      totalCount: numAikus
    }
  }


})

const getAikusAsync = async(query, user:User):Promise<aiku[]> => {
  return await prisma.aiku.findMany({
    orderBy: [
      {
        createdAt: query.orderDir
      }
    ],
    take: 4,
    where: {
      userId: user.id
    }
  }) 
}

const getAikusCursorAsync = async(query, user:User):Promise<aiku[]> => {
  return await prisma.aiku.findMany({
    orderBy: [
      {
        createdAt: query.orderDir
      }
    ],
    take: 4,
    skip: parseInt(query.pageNum) - 1,
    cursor: {
      id: query.cursor
    },
    where: {
      userId: user.id
    }
  }) 
}

const getAikusCount = async(user:User):Promise<number> => {
  return await prisma.aiku.count({
    where: {
      userId: user.id
    }
  }) 
}

