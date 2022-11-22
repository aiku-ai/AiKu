<template>
  <div>
    <Html :class="isDark ? 'dark':''" >
      <Body class="dark:bg-black bg-black"></Body>
    </Html>

    <div>
      <slot />
    </div>

  </div>
</template>

<script setup lang="ts">
import { useHaikuStore } from '~/stores/haiku'

const user = useSupabaseUser()
const client = useSupabaseAuthClient()

const signOut = async () => {
  const { error } = await client.auth.signOut()

  if(!error) {
    navigateTo("/") 

    const accessToken = useCookie('sb-access-token')
    const refreshToken = useCookie('sb-refresh-token')
    accessToken.value = null
    refreshToken.value = null
  }
}

const route = useRoute()
const curPath = computed(() => {
  return route.path 
})

const haiku = useHaikuStore()


const isDark = useCookie("isDark")

const showProfileDropdown = ref(false)
const showMobileNav = ref(false)

const mobileActiveLink = "dark:bg-violet-800/25 bg-violet-50 border-violet-500 dark:text-violet-500 text-violet-700 border-l-4"
const mobileInactiveLink = "border-transparent dark:text-gray-300 text-gray-600 hover:bg-violet-800/25 hover:border-violet-300 hover:text-violet-500 border-l-4"
</script>
