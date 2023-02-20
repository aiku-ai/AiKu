<template>
  <div class="space-y-3">
    <StdSectionHeader @is-collapsed="isCollapsed = $event" header="Write haiku" :is-collapsible="true"
      :collapsed-base-state="props.collapsedBaseState"
      sub-header="Haiku is a short form of Japanese poetry with three lines following a syllable pattern." />
    <div v-if="!isCollapsed" class="space-y-3">
      <div
        :class="lineOneValid ? 'border-gray-300 focus-within:border-violet-600 focus-within:ring-violet-600' : 'border-red-400 focus-within:border-red-500 focus-within:ring-red-500'"
        class="rounded-md border px-3 py-2 shadow-sm focus-within:ring-1 transition-hover-300">
        <label for="lineOne" class="block text-xs font-medium dark:text-gray-100 text-gray-900">Line 1: 5
          syllables</label>
        <input v-model="lineOne" type="text" name="lineOne" id="line-one"
          class="bg-gray-100 dark:bg-gray-900 block w-full border-0 p-0 text-gray-800 dark:text-gray-100 placeholder-gray-500 focus:ring-0 sm:text-sm"
          placeholder="Hyperdrive engaged">

      </div>
      <div
        :class="lineTwoValid ? 'border-gray-300 focus-within:border-violet-600 focus-within:ring-violet-600' : 'border-red-400 focus-within:border-red-500 focus-within:ring-red-500'"
        class="rounded-md border px-3 py-2 shadow-sm focus-within:ring-1 transition-hover-300">
        <label for="lineTwo" class="block text-xs font-medium dark:text-gray-100 text-gray-900">Line 2: 7
          syllables</label>
        <input v-model="lineTwo" type="text" name="lineTwo" id="line-two"
          class="bg-gray-100 dark:bg-gray-900 block w-full border-0 p-0 text-gray-800 dark:text-gray-100 placeholder-gray-500 focus:ring-0 sm:text-sm"
          placeholder="Time and space a memory">
      </div>
      <div
        :class="lineThreeValid ? 'border-gray-300 focus-within:border-violet-600 focus-within:ring-violet-600' : 'border-red-400 focus-within:border-red-500 focus-within:ring-red-500'"
        class="rounded-md border px-3 py-2 shadow-sm focus-within:ring-1 transition-hover-300">
        <label for="lineThree" class="block text-xs font-medium dark:text-gray-100 text-gray-900">Line 3: 5
          syllables</label>
        <input v-model="lineThree" type="text" name="lineThree" id="line-three"
          class="bg-gray-100 dark:bg-gray-900 block w-full border-0 p-0 text-gray-800 dark:text-gray-100 placeholder-gray-500 focus:ring-0 sm:text-sm"
          placeholder="Lightspeed traveler">
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { syllable } from 'syllable'
import type { Ref } from 'vue';
import {
  aikuLineOneKey,
  aikuLineTwoKey,
  aikuLineThreeKey
} from '../../keySymbols'

const lineOne = inject(aikuLineOneKey) as Ref<string>
const lineTwo = inject(aikuLineTwoKey) as Ref<string>
const lineThree = inject(aikuLineThreeKey) as Ref<string>

const isCollapsed = ref(false)

const props = defineProps<{
  collapsedBaseState: 'open' | 'closed'
}>()

if (props.collapsedBaseState === 'closed') {
  isCollapsed.value = true
}

const lineOneValid = computed(() => {
  if (syllable(lineOne.value) === 5 || !lineOne.value) {
    return true
  }
  return false
})

const lineTwoValid = computed(() => {
  if (syllable(lineTwo.value) === 7 || !lineTwo.value) {
    return true
  }
  return false
})

const lineThreeValid = computed(() => {
  if (syllable(lineThree.value) === 5 || !lineThree.value) {
    return true
  }
  return false
})

const inputValid = computed(() => {
  if (
    syllable(lineOne.value) === 5 &&
    syllable(lineTwo.value) === 7 &&
    syllable(lineThree.value) === 5
  ) {
    return true
  }
  return false
})
</script>
