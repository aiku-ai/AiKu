import { useValidatedBody, z } from 'h3-zod'
import { PredictionResponse, DiffusionPresets } from '~/models/replicate'

export default defineEventHandler(async (event):Promise<PredictionResponse> => {
  const body = await useValidatedBody(event, z.object({
    prompt: z.string(),
    preset: z.enum(["NeonMecha"])
  }))

  const presetValue = DiffusionPresets[body.preset]

  const response = await $fetch<PredictionResponse>("https://api.replicate.com/v1/predictions", {
    method: "POST",
    headers: {
      "Authorization": "Token 9f7d6719f5a4f1301cfcd21fb4acf2b0ff06dd31",
      "Content-Type": "application/json"
    },
    body: {
      "version": "c24bbf13332c755f9e1c8b3f10c7f438889145def57d554a74ea751dc5e3b509",
      "input": {
        "prompt": body.prompt + ',' + presetValue,
        "width": 768,
        "height": 896,
        "prompt_strength": 0.8,
        "num_outputs": 1,
        "num_interference_steps": 50,
        "guidance_scale": 7.5
      }
    }
  })
  
  return response
})

