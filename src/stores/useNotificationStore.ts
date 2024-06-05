import { defineStore } from 'pinia'
import { ref } from 'vue'
import { generateRandomId } from '../common/helpers'

export type INotificationStatus = 'success' | 'error' | 'warning' | 'info'
export type INotification = { message: string; status: INotificationStatus; id: string }

export const useNotificationStore = defineStore('notification', () => {
  const notificationList = ref<INotification[]>([
    // { id: '1', message: 'Hello world!', status: 'error' },
    // { id: '2', message: 'Hello world!', status: 'success' }
  ])

  const openNotification = (message: string, status: INotificationStatus, clearAll = true) => {
    if (clearAll) {
      notificationList.value = []
    }
    const id = generateRandomId()
    notificationList.value.push({
      message,
      status,
      id
    })

    setTimeout(() => {
      notificationList.value = notificationList.value.filter((i) => i.id !== id)
    }, 3000)
  }

  const closeNotification = (id: string) => {
    notificationList.value = notificationList.value.filter((i) => i.id !== id)
  }

  return {
    closeNotification,
    notificationList,
    openNotification
  }
})
