import { useValidatedBody, z } from 'h3-zod'
import { PredictionResponse, DiffusionPresets } from '~/models/replicate'

const config = useRuntimeConfig()

export default defineEventHandler(async (event):Promise<PredictionResponse> => {
  const body = await useValidatedBody(event, z.object({
    prompt: z.string(),
    preset: z.enum(["Neon Mecha", "Ominous Escape", "Lush Illumination"]),
    promptStrength: z.number()
  }))

  const presetValue = DiffusionPresets.get(body.preset)

  const response = await $fetch<PredictionResponse>("https://api.replicate.com/v1/predictions", {
    method: "POST",
    headers: {
      "Authorization": `Token ${config.repApiKey}`,
      "Content-Type": "application/json"
    },
    body: {
      "version": "c24bbf13332c755f9e1c8b3f10c7f438889145def57d554a74ea751dc5e3b509",
      "input": {
        "prompt": body.prompt + ',' + presetValue,
        "width": 768,
        "height": 896,
        "prompt_strength": body.promptStrength,
        "num_outputs": 1,
        "num_interference_steps": 50,
        "guidance_scale": 7.5
      }
    }
  })
  
  return response
})

