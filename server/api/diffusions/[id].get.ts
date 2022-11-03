import { PredictionResponse } from '~/models/replicate'

const config = useRuntimeConfig()

export default defineEventHandler(async (event):Promise<PredictionResponse> => {
  const id = event.context.params.id
  
  const response = await $fetch<PredictionResponse>(`https://api.replicate.com/v1/predictions/${id}`, {
    method: "GET",
    headers: {
      "Authorization": `Token ${config.repApiKey}`,
      "Content-Type": "application/json"
    }
  })
  
  return response
})

