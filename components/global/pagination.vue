<template>
  <nav class="mt-2 flex items-center justify-between py-3" aria-label="Pagination">
    <div class="hidden sm:block">
      <p class="text-sm dark:text-gray-300 text-gray-700">
        Showing
        <span class="font-medium">{{ pageNum === 1 ? 1:(pageNum - 1) * pageSize }}</span>
        to
        <span class="font-medium">{{ isLastPage ?  recordTotal:((pageNum -1) * pageSize) + pageSize }}</span>
        of
        <span class="font-medium">{{ recordTotal }}</span>
        results
      </p>
    </div>
    <div class="flex flex-1 justify-between sm:justify-end">
      <button @click="$emit('prev')" v-if="pageNum !== 1" type="button" class="relative inline-flex items-center rounded-md border border-gray-300 dark:bg-gray-900 px-4 py-2 text-sm font-medium dark:text-gray-300 text-gray-700 hover:bg-gray-50 transition-hover-300">Previous</button>
      <button v-else disabled type="button" class="relative inline-flex items-center rounded-md border dark:border-gray-700 border-gray-300 dark:bg-gray-900 px-4 py-2 text-sm font-medium dark:text-gray-600 text-gray-400">Previous</button>
      <button v-if="!isLastPage" @click="$emit('next')" type="button" class="relative ml-3 inline-flex items-center rounded-md border border-gray-300 dark:bg-gray-900 px-4 py-2 text-sm font-medium dark:text-gray-300 text-gray-700 hover:bg-gray-50 transition-hover-300">Next</button>
      <button v-else disabled type="button" class="relative ml-3 inline-flex items-center rounded-md border dark:border-gray-700 border-gray-300 dark:bg-gray-900 px-4 py-2 text-sm font-medium dark:text-gray-600 text-gray-400">Next</button>
    </div>
  </nav>
</template>

<script setup lang="ts">

const emits = defineEmits(["prev", "next"])

const props = defineProps({
  pageNum: {
    type: Number,
    required: true 
  },
  pageSize: {
    type: Number,
    required: true
  },
  isLastPage: {
    type: Boolean,
    required: true
  },
  recordTotal: {
    type: Number,
    required: true
  },
})

</script>
