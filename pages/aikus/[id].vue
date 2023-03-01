<template>
  <ViewAiku 
    :id="aiku!.id"
    :line-one="aiku!.lineOne"
    :line-two="aiku!.lineTwo"
    :line-three="aiku!.lineThree"
    :img-url="imgUrl.data.publicUrl"
    :img-url-overlay="imgUrlOverlay.data.publicUrl"
  />
</template>

<script setup lang="ts">
const route = useRoute()
const config = useRuntimeConfig()
const sbClient = useSupabaseClient()

const aikuId = route.params.id

const { data: aiku, error: getAikuError } = await useFetch(`/api/v2/aikus/${aikuId}`)

if (getAikuError.value) {
  console.error(getAikuError.value)
  throw createError({ statusCode: 500, statusMessage: "Uh oh, something went wrong fetching the AiKu"})
}

const imgUrl = sbClient.storage.from('aikus').getPublicUrl(`${aiku.value!.id}.png`)
const imgUrlOverlay = sbClient.storage.from('aikus').getPublicUrl(`${aiku.value!.id}_overlay.png`)

useHead({
  title: `${aiku.value?.lineOne}, ${aiku.value?.lineTwo}, ${aiku.value?.lineThree},`,
  meta: [
    // PRIMARY TAGS
    { hid: 'description', name: 'description', content: `${aiku.value?.lineOne}, ${aiku.value?.lineTwo}, ${aiku.value?.lineThree},` },
    { hid: 'title', name: 'title', content: `${aiku.value?.lineOne}, ${aiku.value?.lineTwo}, ${aiku.value?.lineThree},` },
    // OPEN GRAPH/FACEBOOK
    { hid: 'og:type', property: 'og:type', content: 'website' },
    { hid: 'og:url', property: 'og:url', content: `${config.public.baseUrl}/${aikuId}` },
    { hid: 'og:title', property: 'og:title', content: `${aiku.value?.lineOne}, ${aiku.value?.lineTwo}, ${aiku.value?.lineThree},` },
    { hid: 'og:image', property: 'og:image', content: imgUrlOverlay.data.publicUrl },
    // TWITTER
    { name: 'twitter:card', content: 'summary_large_image' },
    { name: 'twitter:title', content: `${aiku.value?.lineOne}, ${aiku.value?.lineTwo}, ${aiku.value?.lineThree},` },
    { name: 'twitter:description', content: `${aiku.value?.lineOne}, ${aiku.value?.lineTwo}, ${aiku.value?.lineThree},` },
    { name: 'twitter:image', content: imgUrlOverlay.data.publicUrl }
  ]
})
</script>
