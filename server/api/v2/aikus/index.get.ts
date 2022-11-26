import { zh, z, useValidatedQuery } from 'h3-zod';
import { PrismaClient } from '@prisma/client'
import { serverSupabaseServiceRole } from '#supabase/server'
import type { H3Event } from 'h3'
import { aiku } from '@prisma/client'

const prisma = new PrismaClient()

export type AikuPlusImg = {
  aiku: aiku;
  img: Blob
}

/**
  * This endpoint returns AiKus for the browse/feed page
**/
export default defineEventHandler(async (event):Promise<aiku[]> => {
  const query = zh.useValidatedQuery(event, z.object({
    count: z.string(),
    cursor: z.string().optional()
  }))

  if (query.cursor) {
    return await getAikusWithCursor(parseInt(query.count), query.cursor)
  }
  return await getAikus(parseInt(query.count))
})

const getAikus = async (count: number):Promise<aiku[]> => {
  return await prisma.aiku.findMany({ 
    take: count,
    orderBy: {
      createdAt: "desc"
    }
  })
}

const getAikusWithCursor = async (count: number, cursor: string):Promise<aiku[]> => {
  return await prisma.aiku.findMany({ 
    take: count,
    skip: count,
    cursor: {
      id: cursor
    },
    orderBy: {
      createdAt: "desc"
    }
  })
}

const getImgBinary = async (event: H3Event, aikuId: string):Promise<Blob | null> => {
  const sbClient = serverSupabaseServiceRole(event)
  const imgBin = await sbClient.storage.from('aikus').download(`${aikuId}.png`)

  if (imgBin.error) {
    return null
  }

  return imgBin.data
}

