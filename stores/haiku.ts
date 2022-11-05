import { defineStore } from 'pinia'

export const useHaikuStore = defineStore('haikuStore', () => {
  const lineOne = ref<string>("Hyperdrive engaged")
  const lineTwo = ref<string>("Time and space a memory")
  const lineThree = ref<string>("Lightspeed traveler")
  const imgUrl = ref<string>("")
  const showOverlay = ref(false)


  return {
    lineOne,
    lineTwo,
    lineThree,
    imgUrl,
    showOverlay
  }
})
