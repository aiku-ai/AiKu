<template>
  <div v-if="show" class="relative z-10" aria-labelledby="modal-title" role="dialog" aria-modal="true">

    <Transition
      enter-active-class="ease-out duration-300"
      enter-from-class="opacity-0"
      enter-to-class="opacity-100"
      leave-active-class="ease-in duration-200"
      leave-from-class="opacity-100"
      leave-to-class="opacity-0"
    >
      <div v-if="innerShow" class="fixed inset-0 bg-zinc-900 bg-opacity-60 transition-opacity"></div>
    </Transition>

    <div class="fixed inset-0 z-10 overflow-y-auto">
      <div class="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">

        <Transition
          enter-active-class="ease-out duration-300"
          enter-from-class="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
          enter-to-class="opacity-100 translate-y-0 sm:scale-100"
          leave-active-class="ease-in duration-200"
          leave-from-class="opacity-100 translate-y-0 sm:scale-100"
          leave-to-class="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
        >
          <div v-if="innerShow" class="relative transform overflow-hidden rounded-lg dark:bg-zinc-900 bg-white px-4 pt-5 pb-4 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg sm:p-6">
            <div>
              <div class="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-violet-200">
                <div v-html="props.svg"></div>
              </div>
              <div class="mt-3 text-center sm:mt-5">
                <h3 class="text-base font-semibold leading-6 dark:text-zinc-100 text-zinc-900" id="modal-title">{{ props.header }}</h3>
                <div class="mt-2">
                  <p class="text-sm text-zinc-500">{{ props.subHeader }}</p>
                </div>
              </div>
            </div>
            <div class="mt-5 sm:mt-6 sm:grid sm:grid-flow-row-dense sm:grid-cols-2 sm:gap-3">
              <!-- <button @click="$emit('actionClicked')" type="button" class="inline-flex w-full justify-center rounded-md bg-violet-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-violet-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-violet-600 sm:col-start-2 transition-hover-300">{{ props.actionText }}</button> -->
              <SubmitButton @submit="$emit('actionClicked')" class="w-full sm:col-start-2" color="violet" submit-text="Publish" :is-valid-state="true" :submit-loading="actionLoading" submit-loading-text="Publishing" />
              <button @click="close()" type="button" class="mt-3 inline-flex w-full justify-center rounded-md font-bold bg-white px-3 py-2 text-sm text-zinc-900 shadow-sm ring-1 ring-inset ring-zinc-300 hover:bg-zinc-50 sm:col-start-1 sm:mt-0 transition-hover-300">{{ props.cancelText }}</button>
            </div>
          </div>
        </Transition>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">

const props = defineProps<{
  header: string
  subHeader: string
  svg: string
  show: boolean
  actionLoading: boolean
  actionText: string
  cancelText: string
}>()

const emit = defineEmits(['cancelClicked', 'actionClicked'])
const innerShow = ref(false)
  
setTimeout(() => {
  innerShow.value = true
}, 1);

const close = () => {
  innerShow.value = false
  setTimeout(() => {
    emit('cancelClicked')
  }, 200);
}

</script>
