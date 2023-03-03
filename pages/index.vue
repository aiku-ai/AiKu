<template>
  <div class="isolate dark:bg-gray-900 bg-gray-100">
    <!-- needed for dark mode -->
    <Html class="dark">
      <Body class="dark:bg-gray-900 bg-gray-100"></Body>
    </Html>

    <div class="absolute inset-x-0 top-[-10rem] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[-20rem]">
      <svg class="relative left-[calc(50%-11rem)] -z-10 h-[21.1875rem] max-w-none -translate-x-1/2 rotate-[30deg] sm:left-[calc(50%-30rem)] sm:h-[42.375rem]" viewBox="0 0 1155 678">
        <path fill="url(#45de2b6b-92d5-4d68-a6a0-9b9b2abad533)" fill-opacity=".3" d="M317.219 518.975L203.852 678 0 438.341l317.219 80.634 204.172-286.402c1.307 132.337 45.083 346.658 209.733 145.248C936.936 126.058 882.053-94.234 1031.02 41.331c119.18 108.451 130.68 295.337 121.53 375.223L855 299l21.173 362.054-558.954-142.079z" />
        <defs>
          <linearGradient id="45de2b6b-92d5-4d68-a6a0-9b9b2abad533" x1="1155.49" x2="-78.208" y1=".177" y2="474.645" gradientUnits="userSpaceOnUse">
            <stop stop-color="#9089FC" />
            <stop offset="1" stop-color="#FF80B5" />
          </linearGradient>
        </defs>
      </svg>
    </div>
    <div class="px-6 pt-6 lg:px-8">
      <nav class="flex items-center justify-between" aria-label="Global">
        <div class="flex lg:flex-1">
          <NuxtLink to="/" class="font-bold text-lg dark:text-gray-100 text-gray-900">AiKu</NuxtLink>
        </div>
        <div class="flex flex-1 justify-end">
          <NuxtLink to="/login" class="text-sm font-semibold leading-6 dark:text-gray-100 text-gray-900">Log in <span aria-hidden="true">&rarr;</span></NuxtLink>
        </div>
      </nav>

    </div>
    <main>
      <div class="relative px-6 lg:px-8">
        <div class="mx-auto max-w-2xl py-32 sm:py-48 lg:py-56">
          <div class="hidden sm:mb-8 sm:flex sm:justify-center">
            <div class="relative rounded-full py-1 px-3 text-sm leading-6 dark:text-gray-400 text-gray-600 ring-1 dark:ring-gray-100/10 ring-gray-900/10 hover:ring-gray-900/20">
              Interested in helping us create more AI products? <NuxtLink to="/" class="font-semibold dark:text-violet-500 text-violet-600"><span class="absolute inset-0" aria-hidden="true"></span>Contact us <span aria-hidden="true">&rarr;</span></NuxtLink>
            </div>
          </div>
          <div class="text-center">
            <h1 class="text-4xl font-bold tracking-tight dark:text-gray-100 text-gray-900 sm:text-6xl">Create art through the power of AI</h1>
            <p class="mt-6 text-lg leading-8 dark:text-gray-400 text-gray-600">Write a 日本語の俳句 (Japanese haiku) and allow AI to generate art that goes along with it. Save, share, create collections, and print your creations. </p>
            <div class="mt-10 flex items-center justify-center gap-x-6">
              <NuxtLink to="/create" class="rounded-md bg-violet-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-violet-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-violet-600 transition-hover-300">Get started</NuxtLink>
              <NuxtLink to="/browse" class="text-sm font-semibold leading-6 dark:text-gray-100 text-gray-900 transition-hover-300">Browse AiKus <span aria-hidden="true">→</span></NuxtLink>
            </div>
          </div>
        </div>
        <div class="absolute inset-x-0 top-[calc(100%-13rem)] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[calc(100%-30rem)]">
          <svg class="relative left-[calc(50%+3rem)] h-[21.1875rem] max-w-none -translate-x-1/2 sm:left-[calc(50%+36rem)] sm:h-[42.375rem]" viewBox="0 0 1155 678">
            <path fill="url(#ecb5b0c9-546c-4772-8c71-4d3f06d544bc)" fill-opacity=".3" d="M317.219 518.975L203.852 678 0 438.341l317.219 80.634 204.172-286.402c1.307 132.337 45.083 346.658 209.733 145.248C936.936 126.058 882.053-94.234 1031.02 41.331c119.18 108.451 130.68 295.337 121.53 375.223L855 299l21.173 362.054-558.954-142.079z" />
            <defs>
              <linearGradient id="ecb5b0c9-546c-4772-8c71-4d3f06d544bc" x1="1155.49" x2="-78.208" y1=".177" y2="474.645" gradientUnits="userSpaceOnUse">
                <stop stop-color="#9089FC" />
                <stop offset="1" stop-color="#FF80B5" />
              </linearGradient>
            </defs>
          </svg>
        </div>
      </div>
    </main>
  </div>

</template>

<script setup lang="ts">
definePageMeta({
  layout: false
}) 

const config = useRuntimeConfig()

useHead({
  title: 'AiKu - Create art through the power of AI',
  meta: [
    // PRIMARY TAGS
    { hid: 'description', name: 'description', content: 'Write a 日本語の俳句 (Japanese haiku) and allow AI to generate art that goes along with it. Save, share, create collections, and print your creations.' },
    { hid: 'title', name: 'title', content: 'AiKu - Create art through the power of AI' },
    // OPEN GRAPH/FACEBOOK
    { hid: 'og:type', property: 'og:type', content: 'website' },
    { hid: 'og:url', property: 'og:url', content: config.public.baseUrl },
    { hid: 'og:title', property: 'og:title', content: 'AiKu - Create art through the power of AI' },
    { hid: 'og:image', property: 'og:image', content: config.public.baseUrl + '/aiku_card.png' },
    // TWITTER
    { name: 'twitter:card', content: 'summary_large_image' },
    { name: 'twitter:title', content: 'AiKu - Create art through the power of AI' },
    { name: 'twitter:description', content: `Write a 日本語の俳句 (Japanese haiku) and allow AI to generate art that goes along with it. Save, share, create collections, and print your creations.` },
    { name: 'twitter:image', content: config.public.baseUrl + '/aiku_card.png' }
  ]
})
</script>
