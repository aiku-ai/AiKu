<template>
  <div class="space-y-3">
    <StdSectionHeader @is-collapsed="isCollapsed = $event" header="Tweak text" :is-collapsible="true"
      :collapsed-base-state="props.collapsedBaseState"
      sub-header="Use this to customize the image that's generated. This gives you more control than just the Haiku text." />
    <div v-if="!isCollapsed">
      <textarea v-model="tweakText" rows="4" name="tweak-text" id="tweak-text"
        class="block w-full rounded-md border-gray-300 shadow-sm text-zinc-700 dark:text-zinc-300 bg-gray-100 dark:bg-gray-900 focus:border-violet-500 focus:ring-violet-500 sm:text-xs transition-hover-300"
        placeholder="example: mountain landscape with trees and a distant city skyline" />
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Ref } from 'vue';
import {
  tweakTextKey
} from '../../keySymbols'

const tweakText = inject(tweakTextKey) as Ref<string>
const isCollapsed = ref(false)

const props = defineProps<{
  collapsedBaseState: 'open' | 'closed'
}>()

if (props.collapsedBaseState === 'closed') {
  isCollapsed.value = true
}
</script>
