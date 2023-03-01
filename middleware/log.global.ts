import { $fetch } from 'ofetch'

export default defineNuxtRouteMiddleware(async (to, from) => {
  const config = useRuntimeConfig()

  await $fetch(`${config.public.baseUrl}/api/activities/logs`, {
    method: "POST",
    body: {
      to: to,
      from: from
    }
  })
})
