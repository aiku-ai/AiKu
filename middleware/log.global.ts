export default defineNuxtRouteMiddleware(async (to, from) => {
    console.log(to)
    console.log(from)
  
    const { data, error } = await useFetch("/api/activities/log", {
      method: "POST",
      body: {
        to: to,
        from: from
      }
    })
  })