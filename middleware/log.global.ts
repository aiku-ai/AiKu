import { $fetch } from 'ofetch'

export default defineNuxtRouteMiddleware(async (to, from) => {
  const config = useRuntimeConfig()
  const user = useSupabaseUser()

  let visitorId = null
  if (user.value) {
    visitorId = user.value.id
  } else {
    // create tracking cookie so we can handle unauthed users
    visitorId = 'anonuser'
  }


  await $fetch(`${config.public.baseUrl}/api/activities/logs`, {
    method: "POST",
    body: {
      to: to.fullPath,
      from: from.fullPath,
      visitorId: visitorId
    }
  })
})