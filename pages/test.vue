<template>
  <div class="p-10 h-screen w-full">
    <img 
      src="https://replicate.delivery/pbxt/ygtueiTM5A1HIK9YGmNsp81h2l1gRb9FEBfJXsJgzEQ9ld8PA/out-0.png"  
      class="hidden"
      id="myImage"
    >
    <div class="relative h-full w-full">
      <canvas id="myCanvas" :width="width" :height="height" class="absolute inset-0 h-full w-full object-cover rounded-lg"></canvas>
    </div>
  </div>
</template>

<script setup lang="ts">
const width = ref<number>(900)
const height = ref<number>(900)

if (process.client) {
  // width.value = window.innerWidth
  // height.value = window.innerHeight

  var c = document.getElementById("myCanvas");
  let image = document.getElementById("myImage")
  var ctx = c.getContext("2d");
  ctx.drawImage(image,0,0)
  ctx.font = "18px Space Mono";
  ctx.fillText("Hello World", 10, 25, 300);

  console.log(window.innerHeight)
  console.log(window.innerWidth)
}
</script>
