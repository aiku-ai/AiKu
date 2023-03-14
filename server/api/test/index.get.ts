export default defineEventHandler(async (event) => {
  const query = getQuery(event)

  console.log("event", event)
  console.log("query params", query)

  return {
    foo: "bar"
  } 
})
