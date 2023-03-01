<template>
  <div v-if="aiku" class="flex items-center justify-center px-4 py-4 w-full h-[93dvh]">
    <div class="relative h-full w-full max-w-2xl">
      <img :src="imgUrl.data.publicUrl" alt="" class="absolute inset-0 h-full w-full object-cover rounded-lg">
      <div class="absolute bottom-4 left-4 bg-black/50 p-4 rounded-lg">
        <p class="font-bold text-lg text-white">{{ aiku.lineOne }}</p> 
        <p class="font-bold text-lg text-white">{{ aiku.lineTwo }}</p> 
        <p class="font-bold text-lg text-white">{{ aiku.lineThree }}</p> 
        <p class="mt-2 font-base text-gray-200">aiku.app</p>
      </div>
    </div>
  </div>
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
