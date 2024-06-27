import axios from 'axios'
import { computed } from 'vue'
import { useLocale } from 'vuetify'
import { appLocalStorage } from '../common/singleton/localStorage'
import { useRouter } from 'vue-router'
import {
  ERROR_400_NOTI,
  ERROR_401_NOTI,
  ERROR_403_NOTI,
  ERROR_503_NOTI,
  useNotificationStore
} from '../stores/useNotificationStore'
import { textMap } from '../common/constants/text'
import {
  FORBIDEN_ROUTE,
  GUARDED_FORBIDEN_ROUTE,
  GUARDED_UNEXPECTED_ERROR_ROUTE,
  LOGIN_ROUTE,
  UNEXPECTED_ERROR_ROUTE
} from '../router'
import useLogout from './useLogout'
import useUserProfile from './useUserProfile'
import { API_URL } from '../common/constants'

export default function useAxiosClient() {
  const router = useRouter()

  const notiStore = useNotificationStore()

  const { logout } = useLogout()

  const axiosClient = computed(() => {
    const client = axios.create({
      baseURL: API_URL, //   request.params = { ...request.params, locale: current.value }
      timeout: 30000
    })
    client.interceptors.request.use((request) => {
      const token = appLocalStorage.getJwtToken()
      if (token) {
        request.headers['Authorization'] = `Bearer ${token}`
      }
      return request
    })
    client.interceptors.response.use(undefined, async (e) => {
      console.log(e)
      const status = e?.response?.status
      if (status) {
        if (status === 400) {
          notiStore.openNotification(textMap.messages.badRequest, 'error', ERROR_400_NOTI)
          router.push({ name: LOGIN_ROUTE })
          await logout()
          console.error(e)
          throw e
        }
        if (status === 401) {
          notiStore.openNotification(textMap.messages.pleaseLogin, 'error', ERROR_401_NOTI)
          router.push({ name: LOGIN_ROUTE })
          await logout()
          console.error(e)
          throw e
        }
        if (status === 403) {
          notiStore.openNotification(textMap.messages.forbidden, 'error', ERROR_403_NOTI)
          console.error(e)
          throw e
        } else {
          notiStore.openNotification(textMap.messages.error, 'error', ERROR_503_NOTI)
          console.error(e)
          throw e
        }
      }
      notiStore.openNotification(textMap.messages.error, 'error', ERROR_503_NOTI)
      console.error(e)
      throw e
    })
    return client
  })

  return axiosClient
}
