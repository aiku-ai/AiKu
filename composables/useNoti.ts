import { useNotificationStore, NotificationType } from '~/stores/notification'

export const useNoti = (
  type: NotificationType,
  title: string,
  message: string
) => {
  const store = useNotificationStore()
  store.notiType = type
  store.notiTitle = title
  store.notiMessage = message

  store.showNoti = true // show notification
  
  setTimeout(() => { // hide notification after 5 seconds
    store.showNoti = false
  }, 5000)
}
