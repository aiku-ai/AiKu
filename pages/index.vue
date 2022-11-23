<template>
  <div class="flex h-[80vh] lg:h-[93.5vh]">
    <div class="flex flex-1 flex-col justify-center pb-12 px-4 sm:px-6 lg:flex-none lg:px-20">
      <div class="mx-auto w-full max-w-lg lg:w-[28rem]">
        <main>
          <div class="relative">
            <div class="mx-auto pt-20 pb-32 sm:pt-48 sm:pb-40">
              <div>
                <div class="hidden sm:mb-8 sm:flex sm:justify-center">
                  <div class="relative overflow-hidden rounded-full py-1.5 px-4 text-sm leading-6 ring-1 dark:ring-zinc-100/25 ring-zinc-900/10 hover:ring-zinc-900/20">
                    <span class="dark:text-zinc-400 text-zinc-600">
                      What to help us evolve AiKu? <a href="#" class="font-semibold text-violet-600"><span class="absolute inset-0" aria-hidden="true"></span>Contact us <span aria-hidden="true">&rarr;</span></a>
                    </span>
                  </div>
                </div>
                <div>
                  <div class="space-y-5">
                    <h1 class="text-4xl dark:text-zinc-200 font-bold tracking-tight sm:text-center sm:text-4xl border-b border-zinc-300 pb-5">Your creative mind</h1>
                    <h1 class="text-4xl dark:text-zinc-200 font-bold tracking-tight sm:text-center sm:text-4xl border-b border-zinc-300 pb-5">Brings art with AI to life</h1>
                    <button type="button" class="inline-flex items-center justify-center w-full mt-2 dark:text-zinc-200 border border-violet-600 bg-violet-600/25 rounded-lg py-3 px-10 text-4xl font-bold tracking-tight sm:text-center sm:text-4xl focus:outline-none hover:shadow-violet-600/50 hover:shadow-2xl transition-hover-300">
                      <div class="inline-flex items-center">
                        Imagination
                        <div class="relative">
                          <span class="animate-ping top-0 right-2.5 absolute inline-flex h-full w-full rounded-full dark:bg-violet-400/75 bg-violet-600/75 h-2.5 w-2.5"></span>
                          <svg xmlns="http://www.w3.org/2000/svg" class="ml-5 h-6 w-6 dark:text-zinc-200" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">
                            <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                            <path d="M8 13v-8.5a1.5 1.5 0 0 1 3 0v7.5" />
                            <path d="M11 11.5v-2a1.5 1.5 0 0 1 3 0v2.5" />
                            <path d="M14 10.5a1.5 1.5 0 0 1 3 0v1.5" />
                            <path d="M17 11.5a1.5 1.5 0 0 1 3 0v4.5a6 6 0 0 1 -6 6h-2h.208a6 6 0 0 1 -5.012 -2.7l-.196 -.3c-.312 -.479 -1.407 -2.388 -3.286 -5.728a1.5 1.5 0 0 1 .536 -2.022a1.867 1.867 0 0 1 2.28 .28l1.47 1.47" />
                            <path d="M5 3l-1 -1" />
                            <path d="M4 7h-1" />
                            <path d="M14 3l1 -1" />
                            <path d="M15 6h1" />
                          </svg>
                        </div>
                      </div> 
                    </button>
                  </div>
                  <p class="mt-10 text-lg leading-8 dark:text-zinc-400 text-zinc-600 sm:text-center">Write haikus and let our AI generate art that will make your jaw drop. Your mind is your only limitation.</p>
                  <div class="mt-8 flex gap-x-4 sm:justify-center">
                    <NuxtLink href="/signup" class="inline-block rounded-lg bg-violet-600 px-4 py-1.5 text-base font-semibold leading-7 text-white shadow-sm ring-1 ring-violet-600 hover:bg-violet-700 hover:ring-violet-700 transition-hover-300">
                      Get started
                      <span class="text-violet-200" aria-hidden="true">&rarr;</span>
                    </NuxtLink>
                    <NuxtLink to="/browse" class="inline-block rounded-lg px-4 py-1.5 text-base font-semibold leading-7 dark:text-zinc-200 text-zinc-900 ring-1 dark:ring-zinc-100/25 ring-zinc-900/10 hover:ring-zinc-900/20 transition-hover-300">
                      Browse
                      <span class="text-zinc-400" aria-hidden="true">&rarr;</span>
                    </NuxtLink>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main> 
      </div>
    </div>
    <div class="relative hidden w-0 flex-1 lg:block">
      <img class="absolute inset-0 h-full w-full object-cover" src="https://cms.aiku.app/uploads/26af2863_58ee_41af_b2b6_c78e57f9b898_6ed5a8d9d6.png" alt="">
    </div>
  </div>
</template>

<script setup lang="ts">

</script>
