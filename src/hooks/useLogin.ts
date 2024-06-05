import { useMutation, useQueryClient } from '@tanstack/vue-query'
import { useNotificationStore } from '../stores/useNotificationStore'
import useAxiosClient from './useAxiosClient'
import { textMap } from '../common/constants/text'
import { useRouter } from 'vue-router'
import { appLocalStorage } from '../common/singleton/localStorage'

export type ILoginFormData = { email: string; password: string }

export default function useLogin() {
  const axiosClient = useAxiosClient()

  const router = useRouter()

  const notiStore = useNotificationStore()

  const queryClient = useQueryClient()

  async function onSuccess(data: any) {
    const { jwt, user } = data
    appLocalStorage.setJwtToken(jwt)
    const { data: userProfile } = await axiosClient.value.get<any>('users/me', {
      params: {
        populate: 'role'
      }
    })
    queryClient.setQueryData(['user-profile'], userProfile)
    notiStore.openNotification(
      textMap.messages.welcomeBack({ name: userProfile.firstName }),
      'success'
    )

    router.push('/')
  }

  const mutation = useMutation({
    mutationFn: async (data: ILoginFormData) => {
      const { email, password } = data

      const res = await axiosClient.value.post('auth/local', { identifier: email, password })
      return res.data
    },
    onSuccess,
    onError(error, variables, context) {
      // @ts-expect-error
      const statusCode = error?.response?.data?.error?.status
      switch (statusCode) {
        case 400:
          notiStore.openNotification(textMap.messages.invalidEmailOrPassword, 'error', true)
          break
      }
    }
  })

  return mutation
}
