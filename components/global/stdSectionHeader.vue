<template>
  <div class="flex justify-between items-center space-x-4">
    <div>
      <p class="text-zinc-700 dark:text-zinc-300">{{ props.header }}</p>
      <p class="text-xs text-zinc-500">{{ props.subHeader }}</p>
    </div>

    <button v-if="isCollapsed" @click="isCollapsed = false" class="text-zinc-600 dark:text-zinc-400 focus:outline-none">
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"
        class="w-5 h-5">
        <path stroke-linecap="round" stroke-linejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
      </svg>
    </button>
    <button v-if="!isCollapsed" @click="isCollapsed = true" class="text-zinc-600 dark:text-zinc-400 focus:outline-none">
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"
        class="w-5 h-5">
        <path stroke-linecap="round" stroke-linejoin="round" d="M19.5 12h-15" />
      </svg>
    </button>

  </div>
</template>

<script setup lang="ts">

const props = defineProps<{
  header: string,
  subHeader: string,
  isCollapsible: boolean
  collapsedBaseState: 'open' | 'closed'
}>()

const emit = defineEmits<{
  (e: 'isCollapsed', value: boolean): void
}>()

const isCollapsed = ref(false)

if (props.collapsedBaseState === 'closed') {
  isCollapsed.value = true
}

watch(isCollapsed, () => {
  emit("isCollapsed", isCollapsed.value)
})
</script>
