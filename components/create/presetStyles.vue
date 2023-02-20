<template>
  <div>
    <StdSectionHeader header="Style" @is-collapsed="isCollapsed = $event" :is-collapsible="true"
      :collapsed-base-state="props.collapsedBaseState"
      sub-header="Style your component with a preset. This really helps to add a unique flare to your AiKu" />
    <div v-if="objUrls.size > 0 && !isCollapsed" class="mt-3 grid grid-cols-3 gap-3">
      <div v-for="preset in presetsResp">
        <p :class="curSelectedPreset === preset.name ? 'text-violet-600 font-bold' : 'text-zinc-500'"
          class="text-xs line-clamp-1">{{ preset.name }}</p>
        <button v-if="preset.presetObjectKey"
          @click="curSelectedPreset = preset.name, presetSelection = preset.value!, presetSelectionId = preset.id"
          :class="curSelectedPreset === preset.name ? 'border-2 border-violet-600' : 'border-2 border-transparent'"
          class="mt-0.5 w-full rounded-md hover:border-violet-600 transition-hover-300">
          <img :src="objUrls.get(preset.id)" class="h-16 w-full object-cover sm:h-24 rounded-md">
        </button>
        <button v-else @click="curSelectedPreset = preset.name, presetSelectionId = preset.id"
          :class="curSelectedPreset === preset.name ? 'border-violet-600 border-2' : 'border-zinc-500'"
          class="mt-0.5 h-16 w-full border text-zinc-500 text-sm text-center sm:h-24 rounded-md hover:border-violet-600 transition-hover-300">
          No preset
        </button>
      </div>
    </div>
    <div v-else class="mt-3 grid grid-cols-3 gap-3">
      <div v-for="preset in presetsResp">
        <p :class="curSelectedPreset === preset.name ? 'text-violet-600 font-bold' : 'text-zinc-500'"
          class="text-xs line-clamp-1">{{ preset.name }}</p>
        <div
          class="mt-0.5 w-full h-16 sm:h-24 border-2 border-gray-100 dark:border-gray-900 rounded-md bg-zinc-300 dark:bg-zinc-700 animate-pulse">
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Ref } from 'vue';
import {
  presetSelectionIdKey,
  presetSelectionKey
} from '../../keySymbols'

const presetSelection = inject(presetSelectionKey) as Ref<string>
const presetSelectionId = inject(presetSelectionIdKey) as Ref<number | null>
const curSelectedPreset = ref('None')

const isCollapsed = ref(false)

const props = defineProps<{
  collapsedBaseState: 'open' | 'closed'
}>()

if (props.collapsedBaseState === 'closed') {
  isCollapsed.value = true
}

const { data: presetsResp, error: presetsError } = await useFetch("/api/presets")

if (presetsError.value) {
  throw createError({ statusCode: 500, statusMessage: "Uh oh, Failed to get AiKu presets", fatal: true })
}


const sbClient = useSupabaseClient()
const objUrls = ref<Map<number, string>>(new Map())

for (const preset of presetsResp.value!) {
  if (preset.presetObjectKey) {
    const imgUrl = sbClient.storage.from('preset-images').getPublicUrl(preset.presetObjectKey)
    objUrls.value.set(preset.id, imgUrl.data.publicUrl)
  }
}
</script>
