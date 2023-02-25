import { useValidatedBody, z } from 'h3-zod'
import { PredictionResponse, DiffusionPresets } from '~/models/replicate'

const config = useRuntimeConfig()

export default defineEventHandler(async (event): Promise<PredictionResponse> => {
  const body = await useValidatedBody(event, z.object({
    prompt: z.string(),
    preset: z.string().optional().nullable(),
    promptStrength: z.number()
  }))

  const response = await $fetch<PredictionResponse>("https://api.replicate.com/v1/predictions", {
    method: "POST",
    headers: {
      "Authorization": `Token ${config.repApiKey}`,
      "Content-Type": "application/json"
    },
    body: {
      "version": config.sdVersion,
      "input": {
        "prompt": body.prompt + ',' + body.preset,
        "negative_prompt": "duplicate, disfiguration",
        "width": 768,
        "height": 896,
        "prompt_strength": body.promptStrength,
        "num_outputs": 1,
        "num_interference_steps": 300,
        "guidance_scale": 15
      }
    }
  })

  return response
})

