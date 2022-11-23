<template>
  <div class="relative rounded-lg">
    <img 
      :src="props.fields.sdUrl" 
      class="rounded-lg"
    >
    <div class="text-sm absolute bottom-4 left-4 bg-black/50 rounded-lg p-4">
      <p class="font-bold text-white">{{ props.fields.lineOne }}</p> 
      <p class="font-bold text-white">{{ props.fields.lineTwo }}</p> 
      <p class="font-bold text-white">{{ props.fields.lineThree }}</p> 
    </div>
  </div>
</template>

<script setup lang="ts">
import { aiku } from '../../node_modules/.prisma/client/index'

type CardProps = {
  fields: aiku
}
const props = defineProps<CardProps>()

console.log(props)

</script>
