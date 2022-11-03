import { PredictionResponse } from '~/models/replicate'

export default defineEventHandler(async (event):Promise<PredictionResponse> => {
  const id = event.context.params.id
  
  const response = await $fetch<PredictionResponse>(`https://api.replicate.com/v1/predictions/${id}`, {
    method: "GET",
    headers: {
      "Authorization": "Token 9f7d6719f5a4f1301cfcd21fb4acf2b0ff06dd31",
      "Content-Type": "application/json"
    }
  })
  
  return response
})

