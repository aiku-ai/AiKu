<template>
  <div v-if="user" class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6">
    <div class="overflow-hidden rounded-lg dark:border dark:border-gray-700 dark:bg-gray-900 bg-gray-50 shadow">
      <h2 class="sr-only" id="profile-overview-title">My Stuff</h2>
      <div class="dark:bg-gray-900 bg-gray-50 px-4 py-3">
        <div class="sm:flex sm:items-center sm:justify-between">
          <div class="sm:flex sm:space-x-5">
            <div class="mt-4 text-center sm:mt-0 sm:pt-1 sm:text-left">
              <p class="text-xl font-bold dark:text-gray-100 text-gray-900 sm:text-2xl">{{ user.email }}</p>
              <p class="text-sm font-medium dark:text-gray-400 text-gray-600">AiKu Craftsman</p>
            </div>
          </div>
          <!-- <div class="mt-5 flex justify-center sm:mt-0"> -->
          <!--   <a href="#" class="flex items-center justify-center rounded-md border dark:border-gray-700 border-gray-300 dark:bg-gray-900 bg-gray-50 px-4 py-2 text-sm font-medium dark:text-gray-300 text-gray-700 shadow-sm hover:bg-gray-50">View profile</a> -->
          <!-- </div> -->
        </div>
      </div>
      <div class="grid grid-cols-1 divide-y dark:divide-gray-700 divide-gray-200 border-t dark:border-gray-700 border-gray-200 dark:bg-gray-900 bg-gray-50 sm:grid-cols-3 sm:divide-y-0 sm:divide-x">
        <div class="px-6 py-3 text-center text-sm font-medium">
          <!-- <span class="dark:text-gray-100 text-gray-900">{{ aikus.meta.totalCount }}</span> -->
          <span class="dark:text-gray-300 text-gray-600"> AiKus generated</span>
        </div>

        <div class="px-6 py-3 text-center text-sm font-medium">
          <span class="dark:text-gray-100 text-gray-900">2</span>
          <span class="dark:text-gray-300 text-gray-600"> Favorited</span>
        </div>

        <div class="px-6 py-3 text-center text-sm font-medium">
          <span class="dark:text-gray-100 text-gray-900">{{ collections.meta.totalCount }}</span>
          <span class="dark:text-gray-300 text-gray-600"> Collections</span>
        </div>
      </div>
    </div>

    <div v-if="collections.data.length > 0" class="mt-2 flex justify-between items-center">
      <div>
        <div class="flex items-center">
          <p class="mr-3 text-sm leading-5 dark:text-gray-300 text-gray-700">Showing</p>
          <fieldset>
            <legend class="sr-only">Showing</legend>
            <div class="flex sm:items-center sm:space-x-2">
              <div class="flex items-center">
                <input v-model="pageShowing" id="email" name="notification-method" value="aikus" type="radio" checked class="h-4 w-4 border-gray-300 dark:bg-gray-900 text-violet-600 focus:ring-violet-500 transition-hover-300">
                <label for="email" class="ml-1 block text-xs font-medium dark:text-gray-400 text-gray-700">AiKus</label>
              </div>
              <div class="flex items-center">
                <input v-model="pageShowing" id="sms" name="notification-method" value="collections" type="radio" class="h-4 w-4 border-gray-300 dark:bg-gray-900 text-violet-600 focus:ring-violet-500 transition-hover-300">
                <label for="sms" class="ml-1 block text-xs font-medium dark:text-gray-400 text-gray-700">Collections</label>
              </div>
            </div>
          </fieldset>
        </div>
      </div>
    </div>

    <Transition name="fade" mode="out-in">
      <div v-if="pageShowing === 'aikus'" key="aiku">
        <ViewsUserAikus :collections="collections" @refetch-collections="getCollections()" />
      </div>

      <div v-else key="collection">
        <ViewsUserCollections v-if="collections.data.length > 0" :collections="collections" />
        <div v-else>
          <p class="pt-20 text-center dark:text-zinc-400 text-zinc-600">No collections created yet</p>
        </div>
      </div>
    </Transition>

  </div>
</template>


<script setup lang="ts">
definePageMeta({
  middleware: 'auth'
})

const pageShowing = ref<"aikus" | "collections">("aikus")

const user = useSupabaseUser()

const { data:collections, error:collectionsError, refresh:getCollections } = await useFetch("/api/users/collections", {
  key: "collections",
  method: "GET",
  query: {
    orderDir: "desc"
  },
  headers: useRequestHeaders(['cookie']) as Record<string,string>
})

if(collectionsError.value) {
  console.log(collectionsError.value)
}
</script>

<style>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
