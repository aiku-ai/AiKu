<template>
  <div class="grid lg:grid-cols-2 gap-4 px-4 py-12 lg:py-4 w-full lg:h-screen">
    <div class="lg:flex items-center justify-center">
      <div class="w-full lg:max-w-md">
        <div class="space-y-3">
          <div
            :class="lineOneValid ? 'border-gray-300 focus-within:border-violet-600 focus-within:ring-violet-600':'border-red-400 focus-within:border-red-500 focus-within:ring-red-500'"
            class="rounded-md border px-3 py-2 shadow-sm focus-within:ring-1 transition-hover-300"
          >
            <label for="lineOne" class="block text-xs font-medium dark:text-zinc-100 text-gray-900">Line 1: 5 syllables</label>
            <input 
              v-model="lineOne" 
              type="text" 
              name="lineOne" 
              id="line-one" 
              class="bg-zinc-100 dark:bg-zinc-800 block w-full border-0 p-0 text-zinc-800 dark:text-gray-100 placeholder-gray-500 focus:ring-0 sm:text-sm" 
              placeholder="Hyperdrive engaged">
            
          </div> 
          <div 
          :class="lineTwoValid ? 'border-gray-300 focus-within:border-violet-600 focus-within:ring-violet-600':'border-red-400 focus-within:border-red-500 focus-within:ring-red-500'"
            class="rounded-md border px-3 py-2 shadow-sm focus-within:ring-1 transition-hover-300"
          >
            <label for="lineTwo" class="block text-xs font-medium dark:text-zinc-100 text-gray-900">Line 2: 7 syllables</label>
            <input 
              v-model="lineTwo" 
              type="text" 
              name="lineTwo" 
              id="line-two" 
              class="bg-zinc-100 dark:bg-zinc-800 block w-full border-0 p-0 text-zinc-800 dark:text-gray-100 placeholder-gray-500 focus:ring-0 sm:text-sm" 
              placeholder="Time and space a memory">
          </div> 
          <div
          :class="lineThreeValid ? 'border-gray-300 focus-within:border-violet-600 focus-within:ring-violet-600':'border-red-400 focus-within:border-red-500 focus-within:ring-red-500'"
            class="rounded-md border px-3 py-2 shadow-sm focus-within:ring-1 transition-hover-300"
          >
            <label for="lineThree" class="block text-xs font-medium dark:text-zinc-100 text-gray-900">Line 3: 5 syllables</label>
            <input 
              v-model="lineThree" 
              type="text" 
              name="lineThree" 
              id="line-three" 
              class="bg-zinc-100 dark:bg-zinc-800 block w-full border-0 p-0 text-zinc-800 dark:text-gray-100 placeholder-gray-500 focus:ring-0 sm:text-sm" 
              placeholder="Lightspeed traveler"
            >
          </div> 
        </div>
        <div class="mt-6">
          <button 
            v-if="!submitLoading && inputValid"
            @click="submitHaiku" 
            type="button" 
            class="w-full inline-flex justify-center items-center rounded-md border border-transparent bg-violet-600 px-8 py-3 text-base font-medium text-white shadow-sm hover:bg-violet-700 focus:outline-none focus:ring-2 focus:ring-violet-500 focus:ring-offset-2 transition-hover-300"
          >
            <svg xmlns="http://www.w3.org/2000/svg" class="-ml-1 mr-3 h-6 w-6" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">
              <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
              <path d="M4 13a8 8 0 0 1 7 7a6 6 0 0 0 3 -5a9 9 0 0 0 6 -8a3 3 0 0 0 -3 -3a9 9 0 0 0 -8 6a6 6 0 0 0 -5 3" />
              <path d="M7 14a6 6 0 0 0 -3 6a6 6 0 0 0 6 -3" />
              <circle cx="15" cy="9" r="1" />
            </svg>
            Create 
          </button>
          <button 
            v-if="!submitLoading && !inputValid"
            disabled
            type="button" 
            class="cursor-default w-full inline-flex justify-center items-center rounded-md border border-transparent bg-violet-500 px-8 py-3 text-base font-medium text-zinc-300 shadow-sm"
          >
            <svg xmlns="http://www.w3.org/2000/svg" class="-ml-1 mr-3 h-6 w-6" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">
              <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
              <path d="M4 13a8 8 0 0 1 7 7a6 6 0 0 0 3 -5a9 9 0 0 0 6 -8a3 3 0 0 0 -3 -3a9 9 0 0 0 -8 6a6 6 0 0 0 -5 3" />
              <path d="M7 14a6 6 0 0 0 -3 6a6 6 0 0 0 6 -3" />
              <circle cx="15" cy="9" r="1" />
            </svg>
            Create 
          </button>
          <button 
            v-if="submitLoading"
            disabled
            type="button" 
            class="cursor-default w-full inline-flex justify-center items-center rounded-md border border-transparent bg-violet-500 px-8 py-3 text-base font-medium text-zinc-300 shadow-sm"
          >
            <svg class="h-4 w-4 animate-spin mr-2 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
              <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            Create 
          </button>
        </div>

        <div class="mt-5 relative">
          <button @click="showAdvancedOpts = !showAdvancedOpts" type="button" :class="showAdvancedOpts ? 'dark:text-zinc-300 text-zinc-700':'dark:text-zinc-500 text-zinc-400'" class="w-full inline-flex justify-between items-center">
            Advanced Options
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              fill="none" 
              viewBox="0 0 24 24" 
              stroke-width="1.5" 
              stroke="currentColor" 
              :class="showAdvancedOpts ? 'rotate-180':''"
              class="w-6 h-6"
            >
              <path stroke-linecap="round" stroke-linejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
            </svg>
          </button>
          <div v-if="showAdvancedOpts" class="absolute mt-2 space-y-3 w-full dark:bg-zinc-800 bg-zinc-100 pb-4">
            <div>
              <label for="preset" class="block text-xs font-medium dark:text-zinc-300 text-zinc-800">Diffusion Preset</label>
              <select v-model="selectedPreset" id="preset" name="preset" class="mt-1 block bg-zinc-100 dark:bg-zinc-800 text-zinc-800 dark:text-zinc-300 w-full rounded-md border-zinc-300 py-2 pl-3 pr-10 text-base focus:border-violet-500 focus:outline-none focus:ring-violet-500 sm:text-sm transition-hover-300">
                <option :value="preset[0]" v-for="preset in DiffusionPresets">{{ preset[0] }}</option>
              </select>
            </div>
            <div class="rounded-md border border-gray-300 px-3 py-2 shadow-sm focus-within:border-violet-600 focus-within:ring-1 focus-within:ring-violet-600 transition-hover-300">
              <label for="promptStrength" class="block text-xs font-medium dark:text-zinc-300 text-gray-900">Prompt Strength</label>
              <input v-model="selectedPromptStrength" type="text" name="prompt-strength" id="prompt-strength" class="bg-zinc-100 dark:bg-zinc-800 block w-full border-0 p-0 text-zinc-800 dark:text-zinc-100 placeholder-gray-500 focus:ring-0 sm:text-sm">
            </div> 
          </div>
        </div>

      </div>
    </div> 

    <div class="lg:relative mt-10 lg:mt-0">
      <img v-if="predictionImgUrl && !submitLoading" :src="predictionImgUrl" alt="" class="lg:absolute inset-0 w-full h-96 lg:h-full object-cover object-center rounded-lg">
      <!-- <img v-if="predictionImgUrl && !submitLoading"  -->
      <!--   src="https://replicate.delivery/pbxt/ygtueiTM5A1HIK9YGmNsp81h2l1gRb9FEBfJXsJgzEQ9ld8PA/out-0.png"   -->
      <!--   class="lg:absolute inset-0 w-full h-96 lg:h-full object-cover object-center rounded-lg" -->
      <!-- > -->
      <div v-else :class="submitLoading ? 'animate-pulse':''" class="lg:absolute inset-0 px-3 w-full h-96 lg:h-full border border-zinc-500 rounded-lg flex items-center justify-center text-zinc-500 text-sm">
        <div v-if="!submitLoading" class="text-center">
          <p>Create your masterpiece and the art will show up here</p>
          <p v-if="formComplete && !inputValid" class="mt-5 dark:text-red-500 text-red-600">Incorrect number of syllables</p>
          <p v-if="formComplete && inputValid" class="mt-5 dark:text-green-500 text-green-600 flex items-center justify-center">
            <svg xmlns="http://www.w3.org/2000/svg" class="-ml-1 mr-3 h-5 w-5" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">
              <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
              <path d="M4 13a8 8 0 0 1 7 7a6 6 0 0 0 3 -5a9 9 0 0 0 6 -8a3 3 0 0 0 -3 -3a9 9 0 0 0 -8 6a6 6 0 0 0 -5 3" />
              <path d="M7 14a6 6 0 0 0 -3 6a6 6 0 0 0 6 -3" />
              <circle cx="15" cy="9" r="1" />
            </svg>
            Let it rip
          </p>
        </div>
        <div v-else>
          <p>Loading...patience, young space traveler</p>
          <p class="mt-1">Status: {{ loadingStatus }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { syllable } from 'syllable'
import { PredictionResponse, DiffusionPresets} from "~/models/replicate"

const lineOne = ref("")
const lineTwo = ref("")
const lineThree = ref("")

const formComplete = computed(() => {
  if(lineOne.value && lineTwo.value && lineThree.value) {
    return true
  }
  return false
})

const inputValid = computed(() => {
  if(
    syllable(lineOne.value) === 5 && 
    syllable(lineTwo.value) === 7 && 
    syllable(lineThree.value) === 5
  ) {
    return true
  }
  return false
})

const lineOneValid = computed(() => {
  if(syllable(lineOne.value) === 5 || !lineOne.value) {
    return true
  }
  return false
})

const lineTwoValid = computed(() => {
  if(syllable(lineTwo.value) === 7 || !lineTwo.value) {
    return true
  }
  return false
})

const lineThreeValid = computed(() => {
  if(syllable(lineThree.value) === 5 || !lineThree.value) {
    return true
  }
  return false
})

const submitLoading = ref(false)
const loadingStatus = ref<string>()
const predictionResult = ref<PredictionResponse>()
const predictionId = ref<string>()
const predictionImgUrl = ref<string>()
const postIncrement = ref(0)

// SD Configuration
const selectedPreset = ref("Ominous Escape")
const selectedPromptStrength = ref(0.8)
const showAdvancedOpts = ref(false)

const submitHaiku = async () => {
  postIncrement.value++
  submitLoading.value = true

  try {
    const { data, error } = await useFetch("/api/diffusions", {
      method: "POST", 
      key: `${lineOne.value} ${lineTwo.value} ${lineThree.value}`,
      body: {
        prompt: `${lineOne.value} ${lineTwo.value} ${lineThree.value}`,
        preset: selectedPreset.value,
        promptStrength: parseFloat(selectedPromptStrength.value)
      }
    })

    if(error.value) {
      throw error.value
    }

    predictionResult.value = data.value
    predictionId.value = data.value.id
    // call fetchPrediction
    fetchPrediction()
  } catch(error) {
    console.log(error)
  }
}

const fetchIncrement = ref(0)

const fetchPrediction = async () => {
  fetchIncrement.value++
  try {
    const { data, error } = await useFetch(`/api/diffusions/${predictionId.value}`, {
      method: "GET", 
      key: `${lineOne.value} ${lineTwo.value} ${lineThree.value} ${fetchIncrement.value}`,
    })

    if(error.value) {
      throw error.value
    }

    if(data.value.status === 'succeeded') {
      // I know this is a little dubious, it's dev bare with me
      predictionImgUrl.value = data.value.output[0] 
      submitLoading.value = false
      fetchIncrement.value = 0
    } else {
      loadingStatus.value = data.value.status
      setTimeout(() => {
        fetchPrediction()
      }, 5000)
    }
  } catch(error) {
    console.log(error)
  }
}
</script>
