<template>
  <div class="pt-40">
    <!-- <img  -->
    <!--   src="https://replicate.delivery/pbxt/ygtueiTM5A1HIK9YGmNsp81h2l1gRb9FEBfJXsJgzEQ9ld8PA/out-0.png"   -->
    <!--   class="" -->
    <!-- > -->
    <p class="text-lg">Hello World</p>
    <canvas id="myCanvas" class="h-96 w-96 border border-gray-200"></canvas>
  </div>
</template>

<script setup lang="ts">
if (process.client) {
  console.log(process) 
  var c = document.getElementById("myCanvas");
  let image = new Image("https://replicate.delivery/pbxt/ygtueiTM5A1HIK9YGmNsp81h2l1gRb9FEBfJXsJgzEQ9ld8PA/out-0.png")
  var ctx = c.getContext("2d");
  ctx.drawImage(image,0,0)
  ctx.font = "18px Space Mono";
  ctx.fillText("Hello World", 10, 25, 300);
}

</script>
