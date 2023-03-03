<template>
  <WideContainer>

    <div v-if="pageState === 'new'">
      <div class="grid place-items-center min-h-[90vh]">
        <div class="max-w-xl grid grid-cols-1 gap-y-8">
          <div class="md:h-[80vh] overflow-auto md:pr-4 space-y-6">
            <CreateHaikuText collapsed-base-state="open" />
            <CreatePresetStyles collapsed-base-state="open" />
            <CreateTweakText collapsed-base-state="closed" />
          </div>
          <div>
            <SubmitButton color="violet" submit-text="Create" :is-valid-state="true" :submit-loading="diffusionLoading"
              :submit-loading-text="loadingStatus" :svg="rocket" @submit="submitHaiku()" />
          </div>
        </div>
      </div>
    </div>

    <div v-if="pageState === 'edit'" class="grid grid-cols-1 md:grid-cols-2 gap-y-10 gap-x-8 h-[90dvh]">
      <div class="relative mx-auto md:max-w-xl">
        <div class="md:h-[80dvh] overflow-auto md:pr-4 space-y-6">
          <CreateHaikuText collapsed-base-state="closed" />
          <CreatePresetStyles collapsed-base-state="open" />
          <CreateTweakText collapsed-base-state="open" />
        </div>
        <div class="md:absolute bottom-0 w-full mt-6 md:mt-0">
          <SubmitButton class="w-full" color="violet" submit-text="Regenerate" :is-valid-state="true"
            :submit-loading="diffusionLoading" :submit-loading-text="loadingStatus" :svg="rocket"
            @submit="submitHaiku()" />
        </div>
      </div>
      <CreateAikuImgPane class="h-[75dvh] md:h-full" />
    </div>

  </WideContainer>
</template>

<script setup lang="ts">
import { breakpointsTailwind, useBreakpoints } from '@vueuse/core'
import { rocket } from '../assets/icons'
import { PredictionResponse } from "~/models/replicate"

import {
  aikuLineOneKey,
  aikuLineTwoKey,
  aikuLineThreeKey,
  presetSelectionKey,
  presetSelectionIdKey,
  tweakTextKey,
  imgUrlsToRenderKey,
  imgUrlsOverlayToRenderKey,
  imgUrlKey,
  imgUrlOverlayKey
} from '../keySymbols'

const user = useSupabaseUser()

// VARS
const aikuLineOne = ref('')
const aikuLineTwo = ref('')
const aikuLineThree = ref('')
const pageState = ref<'new' | 'edit'>('new')
const presetSelection = ref('')
const presetSelectionId = ref<number>()
const tweakText = ref('')
const seedImgUrl = ref('')
const imgUrlsToRender = ref<string[]>([])
const imgUrlsOverlayToRender = ref<string[]>([])
const imgUrlFull = ref('')
const imgUrlOverlay = ref('')

const diffusionLoading = ref(false)
const diffusionError = ref<boolean>()
const loadingStatus = ref<string>('')
const diffusionResult = ref<PredictionResponse>()
const diffusionId = ref<string>('')

const saveLoading = ref(false)

// data to provide to child components
provide(aikuLineOneKey, aikuLineOne)
provide(aikuLineTwoKey, aikuLineTwo)
provide(aikuLineThreeKey, aikuLineThree)
provide(presetSelectionKey, presetSelection)
provide(presetSelectionIdKey, presetSelectionId)
provide(tweakTextKey, tweakText)
provide(imgUrlsToRenderKey, imgUrlsToRender)
provide(imgUrlsOverlayToRenderKey, imgUrlsOverlayToRender)
provide(imgUrlKey, imgUrlFull)
provide(imgUrlOverlayKey, imgUrlOverlay)


const submitHaiku = async (): Promise<void> => {
  diffusionLoading.value = true

  const { data, error } = await useFetch("/api/diffusions", {
    method: "POST",
    key: new Date().toString(),
    body: {
      prompt: `${aikuLineOne.value} ${aikuLineTwo.value} ${aikuLineThree.value} ${tweakText.value}`,
      preset: presetSelection.value,
      promptStrength: 0.8
    }
  })

  if (error.value || !data.value) {
    useNoti('error', 'Uh oh', 'Something went wrong when creating the AiKu')
    return
  }

  diffusionResult.value = data.value!
  diffusionId.value = data.value.id

  // call fetchPrediction
  fetchPrediction()
}

const saveAiku = async () => {
  saveLoading.value = true
  const { data, error } = await useFetch("/api/v2/aikus", {
    method: "POST",
    key: Date.now().toString(),
    body: {
      sdUrl: imgUrlFull.value,
      lineOne: aikuLineOne.value,
      lineTwo: aikuLineTwo.value,
      lineThree: aikuLineThree.value,
      presetId: presetSelectionId.value
    },
    headers: useRequestHeaders(['cookie']) as Record<string, string>
  })

  if (error.value) {
    console.error(error.value)
    saveLoading.value = false
    useNoti('error', 'Failed to save', 'Uh oh, something went wrong when trying to save the AiKu 😰. Please try again.')
    return
  }
  saveLoading.value = false
  useNoti('success', 'Saved', 'AiKu saved 😎. Head over to My Stuff to view saved AiKus.')
}

const createImageOverlay = async (url: string): Promise<string> => {
  const { data, error } = await useFetch("/api/v2/images/overlays", {
    method: "POST",
    key: Date.now().toString(),
    body: {
      sdUrl: url,
      lineOne: aikuLineOne.value,
      lineTwo: aikuLineTwo.value,
      lineThree: aikuLineThree.value,
      presetId: presetSelectionId.value
    }
  })

  if (error.value || !data.value) {
    console.error(error.value)
    useNoti('error', 'Failed to save', 'Uh oh, something went wrong when trying to generate the AiKu overlay 😰. Please try again.')
    throw createError({ statusCode: 500, statusMessage: "Uh oh, something went wrong when trying to generate the AiKu overlay 😰. Please try again.", fatal: true })
  }

  return data.value?.url!
}


const fetchPrediction = async () => {
  diffusionLoading.value = true

  const { data, error } = await useFetch(`/api/diffusions/${diffusionId.value}`, {
    method: "GET",
    key: new Date().toString(),
  })

  if (error.value) {
    console.error(error.value)
    throw createError({ statusCode: 500, statusMessage: "Uh oh, something went wrong generating the generated AiKu image" })
  }

  if (!data.value) {
    throw createError({ statusCode: 500, statusMessage: "Uh oh, something went wrong generating the generated AiKu image" })
  }

  // set visible loading state to that of the API
  loadingStatus.value = data.value.status

  if (data.value.status === 'succeeded') {
    // save img url
    if (!data.value.output) {
      console.error("Status succeeded however there was no outputted URL")
      throw createError({ statusCode: 500, statusMessage: "Uh oh, something went wrong generating the generated AiKu image" })
    }

    // if mobile, we want to show the REAL image with overlay
    const brkpts = useBreakpoints(breakpointsTailwind)
    if (brkpts.smallerOrEqual('md').value) {
      const url = await createImageOverlay(data.value.output[0])
      imgUrlsToRender.value.push(data.value.output[0])
      imgUrlsOverlayToRender.value.push(url)
      imgUrlFull.value = data.value.output[0]
      imgUrlOverlay.value = url
      pageState.value = 'edit'
      diffusionLoading.value = false
      return
    }

    pageState.value = 'edit'
    diffusionLoading.value = false
    imgUrlsToRender.value.push(data.value.output[0])
    imgUrlsOverlayToRender.value.push(data.value.output[0])
    imgUrlFull.value = data.value.output[0]

    return
  }

  if (data.value.status === 'failed') {
    console.error(data.value.error)
    throw createError({ statusCode: 500, statusMessage: "Uh oh, something went wrong generating the generated AiKu image" })
  }

  setTimeout(() => {
    fetchPrediction()
  }, 5000)
}
</script>
