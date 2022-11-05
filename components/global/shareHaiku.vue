<template>
  <div class="relative h-[85vh] shadow-2xl shadow-violet-600/50">
    <div class="absolute -top-8 right-0 flex items-center justify-between w-full">
      <div>
        <fieldset>
          <div class="mt-1 flex items-center space-x-2 ">
            <label :class="textColor === 'text-white' ? 'ring-1':''" class="-m-0.5 relative p-0.5 rounded-full flex items-center justify-center cursor-pointer focus:outline-none ring-white">
              <input v-model="textColor" type="radio" name="color-choice-white" value="text-white" class="sr-only" aria-labelledby="color-choice-white">
              <span id="color-choice-white" class="sr-only">White</span>
              <span aria-hidden="true" class="h-4 w-4 bg-white border border-black border-opacity-10 rounded-full"></span>
            </label>
            <label :class="textColor === 'text-black' ? 'ring-1':''" class="-m-0.5 relative p-0.5 rounded-full flex items-center justify-center cursor-pointer focus:outline-none ring-black">
              <input v-model="textColor" type="radio" name="color-choice-black" value="text-black" class="sr-only" aria-labelledby="color-choice-black">
              <span id="color-choice-black" class="sr-only">Black</span>
              <span aria-hidden="true" class="h-4 w-4 bg-black border border-black border-opacity-10 rounded-full"></span>
            </label>
          </div>
        </fieldset>
      </div>
      <button @click="haiku.showOverlay = false" type="button" class="inline-flex items-center focus:outline-none text-xs dark:text-zinc-100 text-zinc-800">
        Close 
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="ml-2 w-6 h-6 dark:text-zinc-100 text-zinc-800">
          <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>
    </div> 
    <img 
      :src="haiku.imgUrl" 
      class="lg:absolute inset-0 w-full h-full object-cover object-center rounded-lg"
    >
    <div class="absolute bottom-3 left-3">
      <p :class="textColor" class="font-bold text-lg">{{ haiku.lineOne }}</p> 
      <p :class="textColor" class="font-bold text-lg">{{ haiku.lineTwo }}</p> 
      <p :class="textColor" class="font-bold text-lg">{{ haiku.lineThree }}</p> 
      <p class="mt-2 font-base text-zinc-200">aiku.app</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useHaikuStore } from '~/stores/haiku'

const haiku = useHaikuStore()

const textColor = ref<string>("text-white")

</script>
