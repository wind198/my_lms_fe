import axios from 'axios'
import { computed } from 'vue'
import { useLocale } from 'vuetify'
import { appLocalStorage } from '../common/singleton/localStorage'
import { useRouter } from 'vue-router'
import { useNotificationStore } from '../stores/useNotificationStore'
import { textMap } from '../common/constants/text'
import { FORBIDEN_ROUTE, LOGIN_ROUTE } from '../router'
import useLogout from './useLogout'

export default function useAxiosClient() {
  const router = useRouter()

  const notiStore = useNotificationStore()

  const { logout } = useLogout()

  const axiosClient = computed(() => {
    const client = axios.create({
      baseURL: import.meta.env.VITE_WEBAPI_URL, //   request.params = { ...request.params, locale: current.value }
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
        if (status === 401) {
          notiStore.openNotification(textMap.messages.pleaseLogin, 'error')
          router.push({ name: LOGIN_ROUTE })
          await logout()
          console.error(e)

          throw e
        }
        if (status === 403) {
          notiStore.openNotification(textMap.messages.forbidden, 'error')
          router.push({ name: FORBIDEN_ROUTE })
          console.error(e)

          throw e
        } else {
          notiStore.openNotification(textMap.messages.error, 'error')
          console.error(e)

          throw e
        }
      }
      notiStore.openNotification(textMap.messages.error, 'error')
      console.error(e)

      throw e
    })
    return client
  })

  return axiosClient
}
