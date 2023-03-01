import { $fetch } from 'ofetch'
export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig()
  const body = await readBody(event)


  await $fetch(`${config.matomoBase}`, {
    method: "GET",
    params: {
      idsite: config.matomoSiteId,
      rec: 1,
      uadata: event.node.req.headers["user-agent"],
      cookie: 1,
      action_name: "NavChange",
      rand: "random123",
    }
  })
  console.log(body)

  event.node.res.end()
})