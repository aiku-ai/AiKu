import { useValidatedBody, z } from 'h3-zod'
import { serverSupabaseClient } from '#supabase/server'
import { v4 as uuidv4 } from 'uuid';

const config = useRuntimeConfig()

/**
 * Create an overlay image
**/
export default defineEventHandler(async (event): Promise<{ url: string }> => {
  const client = serverSupabaseClient(event)

  const body = await useValidatedBody(event, z.object({
    lineOne: z.string(),
    lineTwo: z.string(),
    lineThree: z.string(),
    sdUrl: z.string(),
    presetId: z.number().nullable().optional()
  }))

  // needed both for the DB record and for the file name of the bucket object
  const aikuId = uuidv4()

  const overlayImage = await processOverlayImage(body.sdUrl, body.lineOne, body.lineTwo, body.lineThree)
  const uploadRespOverlay = await uploadImage(new Blob([overlayImage]), event, `${aikuId}_overlay`)

  if (!uploadRespOverlay) {
    throw createError({ statusCode: 500, message: 'Failed to upload AiKu image' })
  }

  const imgUrl = client.storage.from('aikus').getPublicUrl(uploadRespOverlay)

  // setResponseHeader(event, "Location", imgUrl.data.publicUrl)
  // event.node.res.setHeader("Location", imgUrl.data.publicUrl)
  // event.node.res.end()

  return {
    url: imgUrl.data.publicUrl
  }

})

const uploadImage = async (img: Blob, event: any, fileName: string): Promise<string | undefined> => {
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
): Promise<ArrayBuffer> => {
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
