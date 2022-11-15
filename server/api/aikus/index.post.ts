import { useValidatedBody, z } from 'h3-zod'
import { v4 as uuidv4 } from 'uuid';
import { FormData } from 'formdata-node'
import { ImageResponse, CreateAikuResponse } from '~/models/strapi'

const config = useRuntimeConfig()

export default defineEventHandler(async (event):Promise<number> => {
  const body = await useValidatedBody(event, z.object({
    lineOne: z.string(),
    lineTwo: z.string(),
    lineThree: z.string(),
    imgUrl: z.string(),
    presetId: z.number().nullable().optional()
  }))

  try {
    const aikuId = await uploadAiku(body.lineOne, body.lineTwo, body.lineThree, body.presetId)
    await uploadImage(body.imgUrl, aikuId)
    return aikuId
  } catch(error) {
    console.log(error)
  }
})

const uploadAiku = async (
  lineOne:string,
  lineTwo:string,
  lineThree:string,
  preset?:number
):Promise<number> => {
  const response = await $fetch<CreateAikuResponse>(`${config.strapiBase}/api/aikus`, {
    method: "POST",
    headers: {
      "Authorization": `bearer ${config.strapiToken}`,
    },
    body: {
      data: {
        lineOne: lineOne,
        lineTwo: lineTwo,
        lineThree: lineThree,
        preset:preset
      }
    }
  })
  return response.data.id
}

const uploadImage = async (imgUrl:string, aikuId:number):Promise<ImageResponse> => {
  const imgResp = await $fetch(imgUrl, {
    responseType: 'blob'
  })
  
  const form = new FormData()
  form.append("files", imgResp, `${uuidv4()}.png`)
  form.append("ref", "api::aiku.aiku")
  form.append("refId", aikuId)
  form.append("field", "image")

  const response = await $fetch<ImageResponse>(`${config.strapiBase}/api/upload`, {
    method: "POST",
    headers: {
      "Authorization": `bearer ${config.strapiToken}`,
    },
    body: form
  })

  return response
}
