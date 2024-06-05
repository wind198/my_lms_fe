import { useMutation, useQueryClient } from '@tanstack/vue-query'
import useAxiosClient from './useAxiosClient'
import type { IUser } from './useUserProfile'
import { useNotificationStore } from '../stores/useNotificationStore'
import { textMap } from '../common/constants/text'

export type ICreateUserFormData = {
  username: string
  email: string
  password: string
  firstName: string
  lastName: string
  phone: string
  educationBackground: string
  type: string
}

export default function useCreateUser() {
  const axiosClient = useAxiosClient()

  const queryClient = useQueryClient()

  const notiStore = useNotificationStore()

  const mutation = useMutation({
    mutationFn: async (data: ICreateUserFormData) => {
      const { data: newUser } = await axiosClient.value.post<IUser>('users', { data })
      const userType = newUser.type
      switch (userType) {
        case 'admin':
          queryClient.invalidateQueries({ queryKey: ['admins'] })
          break
        case 'teacher':
          queryClient.invalidateQueries({ queryKey: ['teachers'] })
          break

        case 'student':
          queryClient.invalidateQueries({ queryKey: ['students'] })
          break
      }
      return newUser as any
    },
    onSuccess() {
      notiStore.openNotification(
        textMap.messages.success({ action: textMap.verbs.create }),
        'success'
      )
    }
  })

  return mutation
}
