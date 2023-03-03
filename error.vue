<template>
  <div class="h-screen min-h-full bg-white py-16 px-6 sm:py-24 md:grid md:place-items-center lg:px-8">
    <div class="mx-auto max-w-max">
      <main class="sm:flex">
        <p v-if="error && error.statusCode" class="text-4xl font-bold tracking-tight text-violet-600 sm:text-5xl">{{ error.statusCode }}</p>
        <p v-else class="text-4xl font-bold tracking-tight text-violet-600 sm:text-5xl">500</p>
        <div class="sm:ml-6">
          <div class="sm:border-l sm:border-gray-200 sm:pl-6">
            <h1 v-if="error && error.statusMessage" class="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl">{{ error.statusMessage }}</h1>
            <h1 v-else class="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl">An error occured</h1>
            <p v-if="error && error.message" class="mt-1 text-base text-gray-500">{{ error.message }}</p>
            <p v-else class="mt-1 text-base text-gray-500">Uh oh, looks like something went wrong. We're not sure what happened :/</p>
          </div>
          <div class="mt-10 flex space-x-3 sm:border-l sm:border-transparent sm:pl-6">
            <NuxtLink to="/" class="inline-flex items-center rounded-md border border-transparent bg-violet-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-violet-700 focus:outline-none focus:ring-2 focus:ring-violet-500 focus:ring-offset-2 transition-hover-300">Go back home</NuxtLink>
            <NuxtLink to="/" class="inline-flex items-center rounded-md border border-transparent bg-violet-100 px-4 py-2 text-sm font-medium text-violet-700 hover:bg-violet-200 focus:outline-none focus:ring-2 focus:ring-violet-500 focus:ring-offset-2 transition-hover-300">Contact support</NuxtLink>
          </div>
        </div>
      </main>
    </div>
  </div>
</template>

<script setup lang="ts">
const props = defineProps({
  error: Object
})

const handleError = () => clearError({ redirect: '/' })
</script>
