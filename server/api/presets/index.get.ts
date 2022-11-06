import { Presets } from '~/models/strapi'

const config = useRuntimeConfig()

export default defineEventHandler(async ():Promise<Presets> => {
  const response = await $fetch<Presets>(`${config.strapiApi}/presets`, {
    method: "GET",
    headers: {
      "Authorization": `bearer ${config.strapiToken}`,
      "Content-Type": "application/json"
    }
  })
  
  return response
})

