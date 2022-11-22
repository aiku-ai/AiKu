import fs from 'fs';
import { useValidatedBody, z } from 'h3-zod'
import { PrismaClient } from '@prisma/client'
import { serverSupabaseUser, serverSupabaseClient } from '#supabase/server'
import { v4 as uuidv4 } from 'uuid';

const prisma = new PrismaClient()
const config = useRuntimeConfig()

/**
 * Create an Aiku.
**/
export default defineEventHandler(async (event) => {
  const user = await serverSupabaseUser(event)

  const body = await useValidatedBody(event, z.object({
    lineOne: z.string(),
    lineTwo: z.string(),
    lineThree: z.string(),
    sdUrl: z.string(),
    presetId: z.number().nullable().optional()
  }))

  // needed both for the DB record and for the file name of the bucket object
  const aikuId = uuidv4()

  const baseImage = await dwnldImgBytes(body.sdUrl)
  const overlayImage = await processOverlayImage(body.sdUrl, body.lineOne, body.lineTwo, body.lineThree)

  const uploadRespBase = await uploadImage(new Blob([baseImage]), event, aikuId)
  const uploadRespOverlay = await uploadImage(new Blob([overlayImage]), event, `${aikuId}_overlay`)

  if (!uploadRespBase || !uploadRespOverlay) {
    throw createError({ statusCode: 500, message: 'Failed to upload AiKu image' })
  }

  // insert AiKu db record
  const resp = await prisma.aiku.create({
    data: {
      id: aikuId,
      createdAt: new Date(),
      lineOne: body.lineOne,
      lineTwo: body.lineTwo,
      lineThree: body.lineThree,
      userId: user ? user.id:null,
      sdUrl: body.sdUrl,
      presetId: body.presetId
    }
  })

  return {
    aikuId: resp.id
  }
})

const dwnldImgBytes = async (url:string):Promise<ArrayBuffer> => {
  return await $fetch(url, {
    responseType: 'arrayBuffer'
  })
}

const uploadImage = async (img:Blob, event:any, fileName:string):Promise<string | undefined> => {
  const client = serverSupabaseClient(event)  
  
  const { data, error } = await client.storage
    .from('aikus')
    .upload(`${fileName}.png`, img)

  if (error) {
    console.log("Failed to upload image: ", error)
    return
  }

  return data.path
}

const processOverlayImage = async (
  imgUrl: string,
  lineOne: string,
  lineTwo: string,
  lineThree: string
):Promise<ArrayBuffer> => {
  return await $fetch(config.imgServiceApiBase + "/api/v1/images/overlays", {
    method: "POST",
    headers: {
      "Authorization": config.imgServiceApiToken
    },
    body: {
      aikuText: {
		    lineOne: lineOne,
		    lineTwo: lineTwo,
		    lineThree: lineThree
	    },
	    imageUrl: imgUrl
    },
    responseType: 'arrayBuffer'
  })
}
