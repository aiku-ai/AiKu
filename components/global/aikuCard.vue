<template>
  <div :key="props.aiku.id" class="relative rounded-lg xl:h-80 md:h-96 h-[30rem]">
    <NuxtLink :to="config.public.baseUrl + '/aikus/' + props.aiku.id" :key="props.aiku.id" class="relative rounded-lg xl:h-80 md:h-96 h-[30rem]">
      <img 
        :src="props.aiku.sdUrl" 
        class="rounded-lg h-full w-full object-cover"
        v-if="!showManageCollection"
      >
    </NuxtLink>
    <transition
      enter-active-class="transition ease-out duration-100"
      enter-from-class="transform opacity-0 scale-95"
      enter-to-class="transform opacity-100 scale-100"
      leave-active-class="transition ease-in duration-75"
      leave-from-class="transform opacity-100 scale-100"
      leave-to-class="transform opacity-0 scale-95"
    >
      <div v-if="showManageCollection" class="absolute inset-0 rounded-lg dark:bg-gray-900 bg-gray-200 z-10">
        <div v-if="collections.data.length === 0" class="flex items-center justify-center h-full px-4">
          <div>
            <p class="text-sm dark:text-gray-400 text-gray-600">You don't have any collections yet, create one?</p>
            <div
              class="mt-3 rounded-md border px-3 py-1 border-gray-300 focus-within:border-violet-600 focus-within:ring-violet-600 shadow-sm focus-within:ring-1 transition-hover-300"
            >
              <label for="new-collection" class="block text-xs font-medium dark:text-gray-100 text-gray-900">Collection name</label>
              <input 
                v-model="collectionName"
                type="text" 
                name="new-collection" 
                id="line-one" 
                class="bg-transparent block w-full border-0 p-0 text-gray-800 dark:text-gray-100 placeholder-gray-500 focus:ring-0 sm:text-sm" 
                placeholder="Collection Name Xyz">
              
            </div> 
            <SubmitButton 
              size="sm"
              color="violet"
              submit-text="Create"
              :submit-loading="addCollectionLoading"
              :is-valid-state="collectionName !== null"
              class="mt-2 w-full"
              @submit="createCollection()"
            />
          </div>
        </div>
        <div v-else class="pt-2.5">
          <div class="w-full">
            <div class="px-4">
              <fieldset>
                <legend class="text-sm font-bold dark:text-gray-200 text-gray-900">Add to collections</legend>
                <div class="mt-4 overflow-x-hidden overflow-y-auto h-56 sm:h-48 xl:h-36">
                  <div v-for="collection in props.collections.data" class="relative flex items-start py-1">
                    <div class="min-w-0 flex-1 text-sm">
                      <label :for="collection.name" class="select-none font-medium dark:text-gray-300 text-gray-700">{{ collection.name }}</label>
                    </div>
                    <div class="ml-3 flex h-5 items-center">
                      <input v-if="colIdMapLoading !== collection.id" @input="modifyCollectionMap($event, collection.id)" :checked="aikuIsInCollection(collection.id)" :id="collection.name" :name="collection.name" type="checkbox" class="h-4 w-4 dark:bg-gray-900 rounded border-gray-300 text-violet-600 focus:ring-violet-500">
                      <svg v-if="colIdMapLoading === collection.id" class="h-4 w-4 animate-spin -ml-1 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                        <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                    </div>
                  </div>
                </div>
              </fieldset>
            </div> 
            <div class="absolute bottom-4 w-full px-4">
              <p class="text-xs dark:text-gray-400 text-gray-600 font-bold">Add to new collection</p>
              <div
                class="mt-1 rounded-md border px-3 py-0.5 border-gray-300 focus-within:border-violet-600 focus-within:ring-violet-600 shadow-sm focus-within:ring-1 transition-hover-300"
              >
                <label for="new-collection" class="block text-xs font-medium dark:text-gray-100 text-gray-900">Collection name</label>
                <input 
                  v-model="collectionName"
                  type="text" 
                  name="new-collection" 
                  id="line-one" 
                  class="bg-transparent block w-full border-0 p-0 text-gray-800 dark:text-gray-100 placeholder-gray-500 focus:ring-0 text-xs" 
                  placeholder="Collection Name Xyz">
                
              </div> 
              <SubmitButton 
                size="xs"
                color="violet"
                submit-text="Create"
                :submit-loading="addCollectionLoading"
                :is-valid-state="collectionName !== ''"
                class="mt-2 w-full"
                @submit="createCollection()"
              />
            </div>
          </div>

        </div>
      </div>
    </transition>
    <div v-if="props.allowManage">
      <button v-if="!showManageCollection" @click="setManageCollection()" type="button" class="z-20 absolute top-2 right-2 bg-gray-900/75 rounded-full text-gray-400 hover:text-white transition-hover-300">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5">
          <path stroke-linecap="round" stroke-linejoin="round" d="M12 6v12m6-6H6" />
        </svg>

      </button> 
      <button v-else @click="showManageCollection = false" type="button" class="z-20 absolute top-2 right-2 bg-gray-900/75 rounded-full text-gray-400 hover:text-white transition-hover-300">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5">
          <path stroke-linecap="round" stroke-linejoin="round" d="M18 12H6" />
        </svg>
      </button> 
    </div>
    <div class="text-sm absolute bottom-2 left-2 bg-black/50 rounded-lg p-2">
      <p class="font-bold text-white">{{ props.aiku.lineOne }}</p> 
      <p class="font-bold text-white">{{ props.aiku.lineTwo }}</p> 
      <p class="font-bold text-white">{{ props.aiku.lineThree }}</p> 
    </div>
  </div>
</template>

<script setup lang="ts">
// can't import these for some reason, I don't get it
// import { aiku, collection } from '~/prisma/client'

// temp setting these to any
type CardProps = {
  aiku: any,
  collections?: any,
  allowManage?:boolean
}
const props = defineProps<CardProps>()
const emit = defineEmits(['refetchCollections'])
const config = useRuntimeConfig()

const showManageCollection = ref(false)

const setManageCollection = async () => {
  showManageCollection.value = true
  await getAikuColMap()
}

const { data:aikuColMap, refresh:getAikuColMap } = await useFetch("/api/v2/aikus/:id/collections", {
  key: props.aiku.id + "_aikuColMap",
  immediate: false,
  query: {
    aikuId: props.aiku.id
  },
  onRequestError({ error }) {
    console.log(error)
    useNoti("error", "Uh oh", "Something went wrong when getting the collections for that AiKu")
  }
})


const collectionName = ref('')
const addCollectionLoading = ref(false)

const createCollection = async () => {
  addCollectionLoading.value = true

  const { error } = await useFetch("/api/users/collections", {
    key: collectionName.value,
    method: "POST",
    body: {
      name: collectionName.value      
    }
  })

  addCollectionLoading.value = false

  if(error.value) {
    useNoti("error", "Uh oh", "We weren't able to create that collection :(") 
    return
  }
  
  // if no error
  collectionName.value = ''
  useNoti("success", "Nice", "We created that collection for you")

  emit('refetchCollections')
}


const colIdMapLoading = ref('')

const modifyCollectionMap = async (event:Event, collectionId:string) => {
  const el = event.target as HTMLInputElement
  // set loading state for that collection 
  colIdMapLoading.value = collectionId

  if(el.checked) {
    await addColMap(collectionId)
    await getAikuColMap()
    colIdMapLoading.value = ''
    return
  }

  // if not checked, then we remove
  try {
    const mapId = getMapId(collectionId)
    await removeColMap(mapId)
    await getAikuColMap()
    colIdMapLoading.value = ''
  } catch (error) {
    useNoti("error", "Uh oh", "An issue occured when trying to add the AiKu to the collection")   
  }
}

const addColMap = async (collectionId:string) => {
  const { error } = await useFetch("/api/users/aikus/collections", {
    key: collectionId,
    method: "POST",
    body: {
      aikuId: props.aiku.id,
      collectionId: collectionId
    }
  })

  if(error.value) {
    useNoti("error", "Uh oh", "An error occured while adding AiKu to collection") 
  }
}

const removeColMap = async (mapId:string) => {
  const { error } = await useFetch("/api/users/aikus/collections", {
    key: mapId,
    method: "DELETE",
    body: {
      mapId: mapId,
    }
  })

  if(error.value) {
    useNoti("error", "Uh oh", "An error occured while removing AiKu from collection") 
  }
}

const aikuIsInCollection = (collectionId:string) => {
  if(aikuColMap.value) {
    const mappings = aikuColMap.value.filter(m => m.collectionId === collectionId)
    if(mappings.length > 0) {
      return true
    }
    return false
  }
  return false
}

const getMapId = (collectionId:string):string => {
  if(aikuColMap.value) {
    const mappings = aikuColMap.value.filter(m => m.collectionId === collectionId)
    if(mappings.length > 0) {
      return mappings[0].id
    }
  }
  throw "No Aiku Collection map found"
}

</script>
