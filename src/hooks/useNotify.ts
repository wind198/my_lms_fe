import { reactive } from 'vue'

export default function useNotify() {
  const notificationList = reactive([])

  const openNotification = (message) => {
    const notification = { message, id: Date.now() }
    notificationList.push(notification)
    setTimeout(() => {
      const index = notificationList.findIndex((noti) => noti.id === notification.id)
      if (index !== -1) {
        notificationList.splice(index, 1)
      }
    }, 3000)
  }

  return {
    notificationList,
    openNotification
  }
}
