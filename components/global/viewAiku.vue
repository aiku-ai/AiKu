<template>
  <div class="flex lg:items-center justify-center px-4 py-10 lg:py-4 w-full h-[93dvh]">
    <div class="relative h-[70dvh] lg:h-full w-full max-w-lg lg:max-w-2xl">
      <img :src="props.imgUrl" alt="" class="hidden lg:block absolute inset-0 h-full w-full object-cover rounded-lg">
      <img :src="props.imgUrlOverlay" alt="" class="lg:hidden block absolute inset-0 h-full w-full object-cover object-bottom rounded-lg">

      <div class="absolute top-4 right-4 flex items-center space-x-2">
        <button @click="download()" type="button" class="inline-flex items-center rounded-md border border-transparent bg-black/50 px-3 py-1.5 text-xs font-medium leading-4 text-white shadow-sm hover:bg-black/75 focus:outline-none focus:ring-1 focus:ring-indigo-500 transition-hover-300">
          Download
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="ml-2 -mr-0.5 h-4 w-4">
            <path stroke-linecap="round" stroke-linejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12L12 16.5m0 0L7.5 12m4.5 4.5V3" />
          </svg>
        </button> 
        <button @click="copyToClipboard()" type="button" class="inline-flex items-center rounded-md border border-transparent bg-black/50 px-3 py-1.5 text-xs font-medium leading-4 text-white shadow-sm hover:bg-black/75 focus:outline-none focus:ring-1 focus:ring-indigo-500 transition-hover-300">
          Share
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="ml-2 -mr-0.5 h-4 w-4">
            <path stroke-linecap="round" stroke-linejoin="round" d="M7.217 10.907a2.25 2.25 0 100 2.186m0-2.186c.18.324.283.696.283 1.093s-.103.77-.283 1.093m0-2.186l9.566-5.314m-9.566 7.5l9.566 5.314m0 0a2.25 2.25 0 103.935 2.186 2.25 2.25 0 00-3.935-2.186zm0-12.814a2.25 2.25 0 103.933-2.185 2.25 2.25 0 00-3.933 2.185z" />
          </svg>
        </button> 
      </div>

      <div class="hidden lg:block absolute bottom-4 left-4 bg-black/50 p-4 rounded-lg">
        <p class="font-bold text-lg text-white">{{ props.lineOne }}</p> 
        <p class="font-bold text-lg text-white">{{ props.lineTwo }}</p> 
        <p class="font-bold text-lg text-white">{{ props.lineThree }}</p> 
        <p class="mt-2 font-base text-gray-200">aiku.app</p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">

const config = useRuntimeConfig()
const props = defineProps<{
  id: string,
  lineOne: string,
  lineTwo: string,
  lineThree: string,
  imgUrl: string,
  imgUrlOverlay: string
}>()

function copyToClipboard() {
  const url = config.public.baseUrl + '/aikus/' + props.id

  try {
    navigator.clipboard.writeText(url);
    useNoti("success", "Copied", "Link copied to your clipboard")
  } catch(error) {
    console.error(error)
    useNoti("error", "Uh oh", "Failed to copy that link to your clipboard")
  }
}

function download() {
  useNoti("info", "Use force touch", "Push and hold on the image, your phone will prompt you to save it")
}
</script>
