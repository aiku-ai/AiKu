<template>
  <div class="relative h-[75dvh] md:h-full w-full">
    <img :src="props.imgUrl" alt="" class="hidden md:block absolute inset-0 h-full w-full object-cover rounded-lg">
    <img :src="props.imgUrlOverlay" alt="" class="md:hidden block absolute inset-0 h-full w-full object-cover object-bottom rounded-lg">

    <div class="absolute top-2 left-2 lg:top-4 lg:left-4 flex items-center space-x-2">
      <button @click="download()" type="button" class="inline-flex items-center rounded-md border border-transparent bg-black/50 px-3 py-1.5 text-xs font-medium leading-4 text-white shadow-sm hover:bg-black/75 focus:outline-none focus:ring-1 focus:ring-zinc-100 transition-hover-300">
        Download
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="ml-2 -mr-0.5 h-4 w-4">
          <path stroke-linecap="round" stroke-linejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12L12 16.5m0 0L7.5 12m4.5 4.5V3" />
        </svg>
      </button> 
      <!-- authed share option -->
      <button v-if="user && (props.id || savedAikuId)" @click="copyToClipboard(true)" type="button" class="inline-flex items-center rounded-md border border-transparent bg-black/50 px-3 py-1.5 text-xs font-medium leading-4 text-white shadow-sm hover:bg-black/75 focus:outline-none focus:ring-1 focus:ring-zinc-100 transition-hover-300">
        Share
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="ml-2 -mr-0.5 h-4 w-4">
          <path stroke-linecap="round" stroke-linejoin="round" d="M7.217 10.907a2.25 2.25 0 100 2.186m0-2.186c.18.324.283.696.283 1.093s-.103.77-.283 1.093m0-2.186l9.566-5.314m-9.566 7.5l9.566 5.314m0 0a2.25 2.25 0 103.935 2.186 2.25 2.25 0 00-3.935-2.186zm0-12.814a2.25 2.25 0 103.933-2.185 2.25 2.25 0 00-3.933 2.185z" />
        </svg>
      </button> 
      <!-- non authed share option -->
      <button v-if="!user && !savedAikuId" @click="shareAiku()" :disabled="saveLoading" type="button" class="inline-flex items-center rounded-md border border-transparent bg-black/50 px-3 py-1.5 text-xs font-medium leading-4 text-white shadow-sm hover:bg-black/75 focus:outline-none focus:ring-1 focus:ring-zinc-100 transition-hover-300">
        Share
        <svg v-if="!saveLoading" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="ml-2 -mr-0.5 h-4 w-4">
          <path stroke-linecap="round" stroke-linejoin="round" d="M7.217 10.907a2.25 2.25 0 100 2.186m0-2.186c.18.324.283.696.283 1.093s-.103.77-.283 1.093m0-2.186l9.566-5.314m-9.566 7.5l9.566 5.314m0 0a2.25 2.25 0 103.935 2.186 2.25 2.25 0 00-3.935-2.186zm0-12.814a2.25 2.25 0 103.933-2.185 2.25 2.25 0 00-3.933 2.185z" />
        </svg>
        <svg v-else class="animate-spin text-white ml-2 -mr-0.5 w-4 h-4" xmlns="http://www.w3.org/2000/svg" fill="none"
          viewBox="0 0 24 24">
          <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
          <path class="opacity-75" fill="currentColor"
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z">
          </path>
        </svg>
      </button> 
      <button v-if="!user && savedAikuId" @click="copyToClipboard(true)" type="button" class="inline-flex items-center rounded-md border border-transparent bg-black/50 px-3 py-1.5 text-xs font-medium leading-4 text-white shadow-sm hover:bg-black/75 focus:outline-none focus:ring-1 focus:ring-zinc-100 transition-hover-300">
        Share
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="ml-2 -mr-0.5 h-4 w-4">
          <path stroke-linecap="round" stroke-linejoin="round" d="M7.217 10.907a2.25 2.25 0 100 2.186m0-2.186c.18.324.283.696.283 1.093s-.103.77-.283 1.093m0-2.186l9.566-5.314m-9.566 7.5l9.566 5.314m0 0a2.25 2.25 0 103.935 2.186 2.25 2.25 0 00-3.935-2.186zm0-12.814a2.25 2.25 0 103.933-2.185 2.25 2.25 0 00-3.933 2.185z" />
        </svg>
      </button> 
      <button v-if="user && showSave && !savedAikuId" @click="saveAiku()" :disabled="saveLoading" type="button" class="inline-flex items-center rounded-md border border-transparent bg-black/50 px-3 py-1.5 text-xs font-medium leading-4 text-white shadow-sm hover:bg-black/75 focus:outline-none focus:ring-1 focus:ring-zinc-100 transition-hover-300">
        Save
        <svg v-if="!saveLoading" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="ml-2 -mr-0.5 w-4 h-4">
          <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
          <path d="M6 4h10l4 4v10a2 2 0 0 1 -2 2h-12a2 2 0 0 1 -2 -2v-12a2 2 0 0 1 2 -2" />
          <circle cx="12" cy="14" r="2" />
          <polyline points="14 4 14 8 8 8 8 4" />
        </svg>
        <svg v-else class="animate-spin text-white ml-2 -mr-0.5 w-4 h-4" xmlns="http://www.w3.org/2000/svg" fill="none"
          viewBox="0 0 24 24">
          <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
          <path class="opacity-75" fill="currentColor"
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z">
          </path>
        </svg>
      </button> 
      <button v-if="!user && showSave" disabled type="button" class="inline-flex items-center rounded-md border border-transparent bg-black/40 px-3 py-1.5 text-xs font-medium leading-4 text-zinc-400 shadow-sm cursor-default">
        Login to save
      </button> 
    </div>

    <div class="hidden md:block absolute bottom-4 left-4 bg-black/50 p-4 rounded-lg">
      <p class="font-bold text-lg text-white">{{ props.lineOne }}</p> 
      <p class="font-bold text-lg text-white">{{ props.lineTwo }}</p> 
      <p class="font-bold text-lg text-white">{{ props.lineThree }}</p> 
      <p class="mt-2 font-base text-gray-200">aiku.app</p>
    </div>

    <Modal 
      :show="showPublishOption"
      header="AiKu Saved, Publish to browse feed?"
      sub-header="Publishing to the browse feed allows others to view your AiKu."
      :svg="rocket"
      :action-loading="publishLoading"
      action-text="Publish"
      cancel-text="No thanks"
      @cancel-clicked="showPublishOption = false"
      @action-clicked="updateAikuPublishedState()"
    />
  </div>
</template>

<script setup lang="ts">
import { rocket } from '../../assets/icons'

const user = useSupabaseUser()
const config = useRuntimeConfig()
const props = defineProps<{
  id?: string,
  lineOne: string,
  lineTwo: string,
  lineThree: string,
  imgUrl: string,
  imgUrlOverlay: string,
  presetId?: number,
  showSave: boolean
}>()

const savedAikuId = ref<string>()
const saveLoading = ref(false)
const showPublishOption = ref(false)
const publishLoading = ref(false)

const aikuId = computed(() => {
  if (props.id) {
    return props.id
  }
  if (savedAikuId.value) {
    return savedAikuId.value
  }
})

function copyToClipboard(showNoti: boolean) {
  const url = config.public.baseUrl + '/aikus/' + aikuId.value
  navigator.clipboard.writeText(url);

  if (showNoti) {
    useNoti("success", "Copied", "Link to AiKu copied to your clipboard 😎.")
  }
}

function download() {
  useNoti("info", "Use force touch", "Push and hold on the image, your phone will prompt you to save it")
}


const saveAiku = async () => {
  saveLoading.value = true
  const { data, error } = await createAiku()

  if (error.value) {
    console.error(error.value)
    saveLoading.value = false
    useNoti('error', 'Failed to save', 'Uh oh, something went wrong when trying to save the AiKu 😰. Please try again.')
    return
  }
  saveLoading.value = false
  savedAikuId.value = data.value!.aikuId
  showPublishOption.value = true
  copyToClipboard(false)
}

const shareAiku = async () => {
  saveLoading.value = true
  const { data, error } = await createAiku()

  if (error.value) {
    console.error(error.value)
    saveLoading.value = false
    useNoti('error', 'Failed to save', 'Uh oh, something went wrong when trying to share the AiKu. Please try again.')
    return
  }
  saveLoading.value = false
  savedAikuId.value = data.value!.aikuId
  copyToClipboard(false)
  useNoti("success", "Copied", "Link to AiKu copied to your clipboard 😎.")
}

const createAiku = async () => {
  return await useFetch<{aikuId: string}>("/api/v2/aikus", {
    method: "POST",
    key: Date.now().toString(),
    body: {
      sdUrl: props.imgUrl,
      lineOne: props.lineOne,
      lineTwo: props.lineTwo,
      lineThree: props.lineThree,
      presetId: props.presetId
    },
    headers: useRequestHeaders(['cookie']) as Record<string, string>
  })
}

const getAiku = async () => {
  return await useFetch(`/api/v2/aikus/${aikuId.value}`) 
}

const updateAikuPublishedState = async () => {
  publishLoading.value = true
  const { data: aikuData, error:aikuError } = await getAiku()

  if (aikuError.value) {
    console.error(aikuError.value)
    publishLoading.value = false
    useNoti('error', 'Failed to publish', 'Uh oh, something went wrong when trying to publish the AiKu. Please try again.')
    return
  }

  aikuData.value!.isPublished = true
  const { data: updateResp, error:updateError } = await useFetch(`/api/v2/aikus/${aikuId.value}`, {
    method: "PUT",
    body: aikuData.value
  }) 

  if (updateError.value) {
    console.error(updateError.value)
    publishLoading.value = false
    useNoti('error', 'Failed to publish', 'Uh oh, something went wrong when trying to publish the AiKu. Please try again.')
    return
  }

  publishLoading.value = false
  showPublishOption.value = false
  useNoti("success", "Published", "AiKu published 😎")
}
</script>
