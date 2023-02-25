<template>
  <div class="relative">
    <img :src="renderUrls[curDiffusionIndex]" alt=""
      class="absolute bottom-4 md:inset-0 w-full h-full object-cover object-bottom rounded-lg">
    <!-- <img -->
    <!--   src="https://zqkgzcsmlreaiihdtxix.supabase.co/storage/v1/object/public/aikus/047f0586-39e2-4399-aae3-b3d2de789abe.png" -->
    <!--   class="lg:absolute inset-0 w-full h-[26rem] lg:h-full object-cover object-center rounded-lg"> -->

    <div class="hidden md:block absolute bottom-4 left-4 bg-black/50 p-4 rounded-lg">
      <p class="font-bold text-lg text-white">{{ aikuLineOne }}</p>
      <p class="font-bold text-lg text-white">{{ aikuLineTwo }}</p>
      <p class="font-bold text-lg text-white">{{ aikuLineThree }}</p>
      <p class="mt-2 font-base text-gray-200">aiku.app</p>
    </div>

    <div v-if="renderUrls.length > 1" class="absolute top-0 md:top-4 right-4 flex justify-end">
      <div class="space-x-3">
        <button @click="previous()" type="button" :disabled="curDiffusionIndex === 0"
          :class="curDiffusionIndex === 0 ? 'text-gray-400 bg-black/40' : 'text-gray-50 bg-black/50 hover:bg-black/75'"
          class="inline-flex items-center rounded-md px-4 py-2 text-sm font-medium shadow-sm focus:outline-none transition-hover-300">Previous</button>
        <button @click="next()" type="button" :disabled="curDiffusionIndex === renderUrls.length - 1"
          :class="curDiffusionIndex === renderUrls.length - 1 ? 'text-gray-400 bg-black/40' : 'text-gray-50 bg-black/50 hover:bg-black/75'"
          class="inline-flex items-center rounded-md px-4 py-2 text-sm font-medium shadow-sm focus:outline-none transition-hover-300">Next</button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Ref } from 'vue';
import {
  aikuLineOneKey,
  aikuLineTwoKey,
  aikuLineThreeKey,
  imgUrlsToRenderKey
} from '../../keySymbols'

const aikuLineOne = inject(aikuLineOneKey) as Ref<string>
const aikuLineTwo = inject(aikuLineTwoKey) as Ref<string>
const aikuLineThree = inject(aikuLineThreeKey) as Ref<string>
const renderUrls = inject(imgUrlsToRenderKey) as Ref<string[]>
const curDiffusionIndex = ref(0)


watch(renderUrls.value, () => {
  // set the cur index to the last in the list so that we always show new
  curDiffusionIndex.value = renderUrls.value.length - 1
})

function next() {
  curDiffusionIndex.value++
}

function previous() {
  curDiffusionIndex.value--
}

</script>
