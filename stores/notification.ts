import { defineStore } from 'pinia'

export enum NotificationType {
  // info = 'info',
  success = 'success',
  // warning = 'warning',
  error = 'error'
}

export const useNotificationStore = defineStore('notification', () => {
  const showNoti = ref(false)
  const notiType:NotificationType = ref(null)
  const notiTitle = ref('')
  const notiMessage = ref('')

  return { notiType, notiTitle, notiMessage, showNoti }
})
