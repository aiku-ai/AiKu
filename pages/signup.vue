<template>
  <div class="flex h-[80vh] lg:h-screen">
    <div class="flex flex-1 flex-col justify-center py-12 px-4 sm:px-6 lg:flex-none lg:px-20 xl:px-24">
      <div class="mx-auto w-full max-w-sm lg:w-96">
        <div>
          <!-- <img class="h-12 w-auto" src="https://tailwindui.com/img/logos/mark.svg?color=violet&shade=600" alt="Your Company"> -->
          <h2 class="mt-6 text-3xl font-bold tracking-tight dark:text-gray-100 text-gray-900">Sign up and start creating</h2>
        </div>

        <div class="mt-8">
          <div>
            <div>
              <p class="text-sm font-medium dark:text-gray-300 text-gray-700">Sign in with</p>
              <div class="mt-1">
                <div>
                  <button @click="signInOauth('google')" type="button" class="inline-flex w-full justify-center rounded-md border border-gray-300 dark:bg-gray-900 bg-white py-1.5 px-4 text-sm font-medium text-gray-500 shadow-sm hover:bg-gray-50 transition-hover-300">
                    <span class="sr-only">Sign in with Google</span>
                    <div v-html="google"></div>
                  </button>
                </div>
              </div>

            </div>

            <div class="relative mt-6">
              <div class="absolute inset-0 flex items-center" aria-hidden="true">
                <div class="w-full border-t border-gray-300"></div>
              </div>
              <div class="relative flex justify-center text-sm">
                <span class="dark:bg-gray-900 bg-gray-100 px-2 dark:text-gray-300 text-gray-500">Or sign up with</span>
              </div>
            </div>
          </div>

          <div class="mt-6">
            <form
              @keyup.prevent.enter="signUp()"
              class="space-y-6"
            >
              <div>
                <label for="email" class="block text-sm font-medium dark:text-gray-300 text-gray-700">Email address</label>
                <div class="mt-1">
                  <input v-model="email" id="email" name="email" type="email" autocomplete="email" required class="block w-full appearance-none rounded-md dark:text-gray-300 dark:bg-gray-900 border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-violet-500 focus:outline-none focus:ring-violet-500 sm:text-sm transition-hover-300">
                </div>
              </div>

              <div class="space-y-1">
                <label for="password" class="block text-sm font-medium dark:text-gray-300 text-gray-700">Password</label>
                <div class="mt-1">
                  <input v-model="password" id="password" name="password" type="password" autocomplete="current-password" required class="block w-full appearance-none rounded-md dark:text-gray-300 dark:bg-gray-900 border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-violet-500 focus:outline-none focus:ring-violet-500 sm:text-sm transition-hover-300">
                </div>
              </div>

              <div>
                <SubmitButton @submit="signUp()" submit-text="Sign up" size="md" color="violet" :submit-loading="signUpLoading" :is-valid-state="email !== '' && password !== ''" class="mt-1.5"/>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
    <div class="relative hidden w-0 flex-1 lg:block">
      <img class="absolute inset-0 h-full w-full object-cover" src="https://cms.aiku.app/uploads/26af2863_58ee_41af_b2b6_c78e57f9b898_6ed5a8d9d6.png" alt="">
    </div>
  </div>
</template>

<script setup lang="ts">
import { google } from '../assets/icons'
const config = useRuntimeConfig()
const client = useSupabaseAuthClient()
const email = ref('')
const password = ref('')

// Login method using providers
const signInOauth = async (provider: 'github' | 'google') => {
  const { error } = await client.auth.signInWithOAuth({ 
    provider,
    options: {
      redirectTo: `${config.public.baseUrl}/create`
    }
  })
  if (error) {
    return useNoti("error", 'Uh oh', error.message)
  }
}

const signUpLoading = ref(false)

const signUp = async() => {
  signUpLoading.value = true

  const { data, error } = await client.auth.signUp({
    email: email.value,
    password: password.value
  })

  signUpLoading.value = false

  if(error) {
    useNoti("error", 'Uh oh', error.message)
    return
  }
}
</script>
