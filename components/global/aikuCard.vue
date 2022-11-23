<template>
  <div class="relative rounded-lg">
    <img 
      :src="props.fields.sdUrl" 
      class="rounded-lg xl:h-80 md:h-96 w-full object-cover"
    >
    <div class="text-sm absolute bottom-2 left-2 bg-black/50 rounded-lg p-2">
      <p class="font-bold text-white">{{ props.fields.lineOne }}</p> 
      <p class="font-bold text-white">{{ props.fields.lineTwo }}</p> 
      <p class="font-bold text-white">{{ props.fields.lineThree }}</p> 
    </div>
    <!-- <div class="absolute top-0 text-white"> -->
    <!--   {{ fields.id }} -->
    <!-- </div> -->
  </div>
</template>

<script setup lang="ts">
import { aiku } from '../../node_modules/.prisma/client/index'

type CardProps = {
  fields: aiku
}
const props = defineProps<CardProps>()
</script>
