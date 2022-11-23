<template>
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
    <div class="overflow-hidden rounded-lg dark:border dark:border-zinc-700 dark:bg-zinc-800 bg-zinc-50 shadow">
      <h2 class="sr-only" id="profile-overview-title">Profile Overview</h2>
      <div class="dark:bg-zinc-800 bg-zinc-50 p-6">
        <div class="sm:flex sm:items-center sm:justify-between">
          <div class="sm:flex sm:space-x-5">
            <div class="mt-4 text-center sm:mt-0 sm:pt-1 sm:text-left">
              <p class="text-xl font-bold dark:text-zinc-100 text-zinc-900 sm:text-2xl">{{ user.email }}</p>
              <p class="text-sm font-medium dark:text-zinc-400 text-zinc-600">AiKu Craftsman</p>
            </div>
          </div>
          <div class="mt-5 flex justify-center sm:mt-0">
            <a href="#" class="flex items-center justify-center rounded-md border dark:border-zinc-700 border-zinc-300 dark:bg-zinc-800 bg-zinc-50 px-4 py-2 text-sm font-medium dark:text-zinc-300 text-zinc-700 shadow-sm hover:bg-zinc-50">View profile</a>
          </div>
        </div>
      </div>
      <div class="grid grid-cols-1 divide-y dark:divide-zinc-700 divide-zinc-200 border-t dark:border-zinc-700 border-zinc-200 dark:bg-zinc-800 bg-zinc-50 sm:grid-cols-3 sm:divide-y-0 sm:divide-x">
        <div class="px-6 py-5 text-center text-sm font-medium">
          <span class="dark:text-zinc-100 text-zinc-900">7</span>
          <span class="dark:text-zinc-300 text-zinc-600"> AiKus generated</span>
        </div>

        <div class="px-6 py-5 text-center text-sm font-medium">
          <span class="dark:text-zinc-100 text-zinc-900">2</span>
          <span class="dark:text-zinc-300 text-zinc-600"> Favorited</span>
        </div>

        <div class="px-6 py-5 text-center text-sm font-medium">
          <span class="dark:text-zinc-100 text-zinc-900">3</span>
          <span class="dark:text-zinc-300 text-zinc-600"> Collections</span>
        </div>
      </div>
    </div>

    <div class="mt-5 grid grid-cols-4 gap-4 ">
      <AikuCard v-for="aiku in aikus" :key="aiku.id.toString()" :fields="aiku"/>
    </div>

  </div>
</template>


<script setup lang="ts">
definePageMeta({
  middleware: 'auth'
})

const user = useSupabaseUser()

const { data:aikus, error } = useFetch("/api/users/aikus", {
  key: Date.now().toString(),
  headers: useRequestHeaders(['cookie'])
}) 

if (error) {
  console.log(error)
}

</script>
