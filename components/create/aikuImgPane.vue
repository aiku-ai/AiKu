<template>
  <div class="relative">
    <ViewAiku 
      v-for="(_url, index) in renderOverlayUrls"
      :key="index"
      v-show="index === curImgIndex"
      :line-one="aikuLineOne"
      :line-two="aikuLineTwo"
      :line-three="aikuLineThree"
      :img-url="renderUrls[curImgIndex]"
      :img-url-overlay="renderOverlayUrls[curImgIndex]"
      :show-save="true"
      :preset-id="aikuPresetId"
    />
    <div class="absolute inset-y-0 right-1 flex items-center">
      <button @click="next()" type="button" v-if="curImgIndex !== renderUrls.length - 1"
        class="inline-flex items-center rounded-md px-2 py-1 text-sm text-zinc-50 bg-black/50 hover:bg-black/75 font-medium shadow-sm focus:outline-none transition-hover-300">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
          <path stroke-linecap="round" stroke-linejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
        </svg>
      </button>
    </div>
    <div class="absolute inset-y-0 left-1 flex items-center">
      <button @click="previous()" v-if="curImgIndex !== 0" type="button" 
        class="inline-flex items-center rounded-md px-2 py-1 text-sm text-zinc-50 bg-black/50 hover:bg-black/75 font-medium shadow-sm focus:outline-none transition-hover-300">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
          <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
        </svg>
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Ref } from 'vue';
import {
  aikuLineOneKey,
  aikuLineTwoKey,
  aikuLineThreeKey,
  presetSelectionIdKey,
  imgUrlsToRenderKey,
  imgUrlsOverlayToRenderKey
} from '../../keySymbols'

const aikuLineOne = inject(aikuLineOneKey) as Ref<string>
const aikuLineTwo = inject(aikuLineTwoKey) as Ref<string>
const aikuLineThree = inject(aikuLineThreeKey) as Ref<string>
const aikuPresetId = inject(presetSelectionIdKey) as Ref<number>
const renderUrls = inject(imgUrlsToRenderKey) as Ref<string[]>
const renderOverlayUrls = inject(imgUrlsOverlayToRenderKey) as Ref<string[]>

const curImgIndex = ref(0)


watch(renderUrls.value, () => {
  // set the cur index to the last in the list so that we always show new
  curImgIndex.value = renderUrls.value.length - 1
})

function next() {
  curImgIndex.value++
}

function previous() {
  curImgIndex.value--
}

</script>
