<template>
  <div class="flex h-[80vh] lg:h-[93.5vh]">
    <div class="flex flex-1 flex-col justify-center pb-12 px-4 sm:px-6 lg:flex-none lg:px-20">
      <div class="mx-auto w-full max-w-lg lg:w-[28rem]">
        <main>
          <div class="relative">
            <div class="mx-auto pt-20 pb-32 sm:pt-48 sm:pb-40">
              <div>
                <div class="hidden sm:mb-8 sm:flex sm:justify-center">
                  <div class="relative overflow-hidden rounded-full py-1.5 px-4 text-sm leading-6 ring-1 ring-gray-900/10 hover:ring-gray-900/20">
                    <span class="text-gray-600">
                      What to help us evolve AiKu? <a href="#" class="font-semibold text-violet-600"><span class="absolute inset-0" aria-hidden="true"></span>Contact us <span aria-hidden="true">&rarr;</span></a>
                    </span>
                  </div>
                </div>
                <div>
                  <h1 class="text-4xl font-bold tracking-tight sm:text-center sm:text-4xl">Your creative mind</h1>
                  <h1 class="mt-2 text-4xl font-bold tracking-tight sm:text-center sm:text-4xl">Brings art with AI to life</h1>
                  <button type="button" class="inline-flex items-center justify-center w-full mt-2 border border-violet-600 bg-violet-600/25 rounded-lg py-3 px-10 text-4xl font-bold tracking-tight sm:text-center sm:text-4xl focus:outline-none">
                    <div class="inline-flex items-center">
                      Imagination
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="ml-6 text-zinc-900 w-8 h-8">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M15.042 21.672L13.684 16.6m0 0l-2.51 2.225.569-9.47 5.227 7.917-3.286-.672zM12 2.25V4.5m5.834.166l-1.591 1.591M20.25 10.5H18M7.757 14.743l-1.59 1.59M6 10.5H3.75m4.007-4.243l-1.59-1.59" />
                      </svg>
                    </div> 
                  </button>
                  <p class="mt-10 text-lg leading-8 text-gray-600 sm:text-center">Write haikus and let our AI generate art that will make your jaw drop. Your mind is your only limitation.</p>
                  <div class="mt-8 flex gap-x-4 sm:justify-center">
                    <NuxtLink href="/signup" class="inline-block rounded-lg bg-violet-600 px-4 py-1.5 text-base font-semibold leading-7 text-white shadow-sm ring-1 ring-violet-600 hover:bg-violet-700 hover:ring-violet-700 transition-hover-300">
                      Get started
                      <span class="text-violet-200" aria-hidden="true">&rarr;</span>
                    </NuxtLink>
                    <NuxtLink to="/browse" class="inline-block rounded-lg px-4 py-1.5 text-base font-semibold leading-7 text-gray-900 ring-1 ring-gray-900/10 hover:ring-gray-900/20 transition-hover-300">
                      Browse
                      <span class="text-gray-400" aria-hidden="true">&rarr;</span>
                    </NuxtLink>
                  </div>
                </div>
                <div class="absolute inset-x-0 top-[calc(100%-13rem)] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[calc(100%-30rem)]">
                  <svg class="relative left-[calc(50%+3rem)] h-[21.1875rem] max-w-none -translate-x-1/2 sm:left-[calc(50%+36rem)] sm:h-[42.375rem]" viewBox="0 0 1155 678" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path fill="url(#ecb5b0c9-546c-4772-8c71-4d3f06d544bc)" fill-opacity=".3" d="M317.219 518.975L203.852 678 0 438.341l317.219 80.634 204.172-286.402c1.307 132.337 45.083 346.658 209.733 145.248C936.936 126.058 882.053-94.234 1031.02 41.331c119.18 108.451 130.68 295.337 121.53 375.223L855 299l21.173 362.054-558.954-142.079z" />
                    <defs>
                      <linearGradient id="ecb5b0c9-546c-4772-8c71-4d3f06d544bc" x1="1155.49" x2="-78.208" y1=".177" y2="474.645" gradientUnits="userSpaceOnUse">
                        <stop stop-color="#9089FC"></stop>
                        <stop offset="1" stop-color="#FF80B5"></stop>
                      </linearGradient>
                    </defs>
                  </svg>
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
