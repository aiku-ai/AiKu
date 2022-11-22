import { defineStore } from 'pinia'

export type NotiType = "error" | "success" | "info"

export const useNotificationStore = defineStore('notification', () => {
  const showNoti = ref(false)
  const notiType = ref<NotiType>()
  const notiTitle = ref('')
  const notiMessage = ref('')

  return { notiType, notiTitle, notiMessage, showNoti }
})
