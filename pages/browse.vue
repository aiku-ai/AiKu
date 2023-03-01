<template>
  <main v-if="baseAikus && aikusForFeed && aikuImgMap.size > 0">
    <!-- top button -->
    <div class="fixed top-0 p-2 flex items-center justify-between w-full">
      <NuxtLink to="/create" class="font-bold text-gray-50" style="text-shadow: 1px 1px 8px black;">AiKu</NuxtLink>
      <NuxtLink to="/create">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6 text-gray-50">
          <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
        </svg>
      </NuxtLink>
    </div> 

    <!-- bottom buttons -->
    <div class="fixed bottom-0 px-4 pb-6 flex items-center justify-between w-full" :style="'opacity:' + opacity + ';'">
      <!-- TO DO: Redirect to user profile -->
      <NuxtLink to="/" class="flex items-center space-x-3 border border-gray-500 py-1 px-2 rounded-lg text-gray-300 bg-black/60 hover:text-gray-100 hover:bg-black hover:border-gray-200 transition-hover-300" style="text-shadow: 1px 1px 8px black;">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5">
          <path stroke-linecap="round" stroke-linejoin="round" d="M17.982 18.725A7.488 7.488 0 0012 15.75a7.488 7.488 0 00-5.982 2.975m11.963 0a9 9 0 10-11.963 0m11.963 0A8.966 8.966 0 0112 21a8.966 8.966 0 01-5.982-2.275M15 9.75a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
        <span class="text-sm">{{ curAikuUser }}</span> 
      </NuxtLink>
      <div class="flex items-center space-x-4">
        <!-- view  -->
        <div class="flex items-center space-x-1 text-gray-50" style="text-shadow: 1px 1px 8px black;">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6 text-gray-50">
            <path stroke-linecap="round" stroke-linejoin="round" d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 013 19.875v-6.75zM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V8.625zM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V4.125z" />
          </svg>
        <span class="text-xs font-bold">{{ curAikuViews }}</span>
        </div>
        <!-- comment -->
        <button v-if="user" type="button">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6 text-gray-50">
            <path stroke-linecap="round" stroke-linejoin="round" d="M7.5 8.25h9m-9 3H12m-9.75 1.51c0 1.6 1.123 2.994 2.707 3.227 1.129.166 2.27.293 3.423.379.35.026.67.21.865.501L12 21l2.755-4.133a1.14 1.14 0 01.865-.501 48.172 48.172 0 003.423-.379c1.584-.233 2.707-1.626 2.707-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0012 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018z" />
          </svg>
        </button>
        <!-- like -->
        <!-- <button v-if="user" type="button" @click="logActivity(curAikuId, 'like')"> -->
        <!--   <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6 text-gray-50"> -->
        <!--     <path stroke-linecap="round" stroke-linejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" /> -->
        <!--   </svg> -->
        <!-- </button> -->
        <BrowseFeedLikeButton />
        <!-- download -->
        <button type="button">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6 text-gray-50">
            <path stroke-linecap="round" stroke-linejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12L12 16.5m0 0L7.5 12m4.5 4.5V3" />
          </svg>
        </button>
      </div>
    </div> 

    <!-- background image -->
    <img :src="aikuImgMap.get(curViewAikuIndex)" alt="" class="h-[100vh] fixed top-0 left-0 w-full object-cover" :style="'z-index: -1; opacity:' + opacity + ';'">

    <!-- aiku text -->
    <div v-for="(aiku, index) in aikusForFeed" :key="aiku.id" class="flex items-center justify-center h-screen" :style="'opacity:' + opacity + ';'">
      <div style="text-shadow: 1px 1px 8px black;" :id="'aiku_'+ index">
        <p class="font-bold text-white">{{ aiku.lineOne }}</p> 
        <p class="font-bold text-white">{{ aiku.lineTwo }}</p> 
        <p class="font-bold text-white">{{ aiku.lineThree }}</p> 
      </div>
    </div>

  </main>
</template>

<script setup lang="ts">
import type { aiku, users } from '@prisma/client'
import { useWindowSize } from '@vueuse/core'

const sbClient = useSupabaseClient()
const user = useSupabaseUser()

definePageMeta({
  layout: 'browse'
})


//CURRENT AIKU DATA
const curAikuViews = computed(() => {
  return aikusForFeed.value![curViewAikuIndex.value]._count.aikuActivity
})
const curAikuUser = computed(() => {
  return aikusForFeed.value![curViewAikuIndex.value].users.email
})
const curAikuId = computed(() => {
  return aikusForFeed.value![curViewAikuIndex.value].id
})

// FUNCTIONS AND VARIABLES FOR LOGGING 
const logActivity = async (aikuId: string, activityType: "view" | "like") => {
  const { error } = await useFetch("/api/activities/post.index", {
    method: "POST", 
    body: {
      aikuId: aikuId,
      activityType: activityType
    },
    headers: useRequestHeaders(['cookie']) as Record<string,string>
  })

  if (error.value) {
    console.log(error.value)
  }
}


// INDEXING FOR CURRENT AIKU
const curViewAikuIndex = ref(0)
watch(curViewAikuIndex, async () => {
  // if we've scrolled through x% of aikus and we're not already loading more, then get more
  if (((curViewAikuIndex.value + 1) / aikusForFeed.value?.length! > 0.75) && !getMoreAikusLoading.value && aikusForFeed.value) {
    const cursor = aikusForFeed.value[curViewAikuIndex.value].id
    await getAndAppendMoreAikus(cursor)
  }
})


// LOAD INITIAL AIKUS AND SET BASE STATE
const loadCount = ref(5)
// this holds how many sets of AiKus we've loaded
const setsLoaded = ref(0)

const aikusForFeed = ref<(aiku & { users: users, _count: { aikuActivity: number }})[]>()
const { data: baseAikus, error: baseAikusError } = await useFetch<(aiku & {users: users, _count: { aikuActivity: number }})[]>(`/api/v2/aikus`, {
  query: {
    count: loadCount.value
  }
})

if (baseAikusError.value || !baseAikus.value) {
  // TO DO: Proper error handling here
  console.log("an error occured gettings aikus")
} else {
  // on initial load, we just want to set it equal
  aikusForFeed.value = baseAikus.value!
  setsLoaded.value++
  // log for the current viewing aiku
  logActivity(curAikuId.value, "view")
}


// FUNCTION AND VARIABLES TO GET MORE AIKUS
const getMoreAikusLoading = ref(false)
const getAndAppendMoreAikus = async (cursor: string) => {
  getMoreAikusLoading.value = true
  const { data: aikus, error: aikusError } = await useFetch<(aiku & {users: users, _count: { aikuActivity: number }})[]>(`/api/v2/aikus`, {
    query: {
      count: loadCount.value,
      cursor: cursor
    }
  })
  
  if (aikusError.value) {
    // TO DO: Proper error handling here
    console.log(`Failed to get more aikus, error: ${aikusError.value}`)
  } else {
    setsLoaded.value++
  }

  // I could split this out, but whatever
  await dwnldAikuImages(aikus.value!)

  for (const aiku of aikus.value!) {
    aikusForFeed.value?.push(aiku)
  }
  getMoreAikusLoading.value = false
}


// UI/IMAGE SCROLL MANIPULATION
const opacity = ref(1)
const aikuImgMap = ref<Map<number, string>>(new Map())

const getObjectUrl = (img: Blob):string => {
  const urlCreator = window.URL
  return urlCreator.createObjectURL(img)
}

const dwnldAikuImages = async (aikus: aiku[]) => {
  for (let i = 0; i < aikus.length; i++) {
    const imgBin = await sbClient.storage.from('aikus').download(`${aikus[i].id}.png`)
    if (imgBin.error) {
      // TO DO: Proper error handling
      console.log(imgBin.error)
    }
    // we don't want to overwrite the indexes of previous added aiku images
    if (setsLoaded.value === 1) {
      aikuImgMap.value.set(i, getObjectUrl(imgBin.data!))
    } else {
      const index =  i + aikusForFeed.value?.length!
      console.log("loading additional, index is: " + index)
      aikuImgMap.value.set(index, getObjectUrl(imgBin.data!))
    }
  }
}

if (process.client) {
  dwnldAikuImages(aikusForFeed.value!)

  // SCROLL STUFF
  const { height } = useWindowSize()

  const scrollUpdate = () => {
    const elem = document.getElementById(`aiku_${curViewAikuIndex.value}`);

    if (!elem) {
      console.log('no element found with that id')
      return
    }
    const rect = elem?.getBoundingClientRect()

    // this means that it's at the top of the viewport and to go next
    if (rect.bottom <= 0) {
      curViewAikuIndex.value++
      // log view
      logActivity(curAikuId.value, "view")
    }

    // this means that it's at the bottom of the viewport and to go previous
    if (rect.top >= height.value) {
      curViewAikuIndex.value--
    }

    // update opacity
    const centerPoint = (rect.top + rect.bottom) / 2
    const topBound = height.value * .30
    const botBound = height.value * .70
    const botBoundHeight = height.value - botBound

    if (centerPoint <= topBound) {
      opacity.value = centerPoint / topBound
    } else if (centerPoint >= botBound) {
      const distPastBotBound = centerPoint - botBound
      opacity.value = 1 - (distPastBotBound / botBoundHeight)
    } else {
      opacity.value = 1 
    }
  }

  document.addEventListener('scroll', scrollUpdate)
}
</script>
