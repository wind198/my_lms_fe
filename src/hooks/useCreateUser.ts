import { useMutation, useQueryClient } from '@tanstack/vue-query'
import useAxiosClient from './useAxiosClient'
import type { IUser, IUserType } from './useUserProfile'
import { useNotificationStore } from '../stores/useNotificationStore'
import { textMap } from '../common/constants/text'
import type { IEducationBackground } from '../common/constants'

export type ICreateUserFormData = {
  email: string
  password: string
  firstName: string
  lastName: string
  phone: string
  educationBackground: IEducationBackground
  type: IUserType
  role: number
}

export default function useCreateUser() {
  const axiosClient = useAxiosClient()

  const queryClient = useQueryClient()

  const notiStore = useNotificationStore()

  const mutation = useMutation({
    mutationFn: async (data: ICreateUserFormData) => {
      const { role, ...o } = data

      const { data: newUser } = await axiosClient.value.post<IUser>('users', {
        ...o,
        role: { connect: [{ id: role }] }
      })
      queryClient.setQueryData(['users'], (prevData: IUser[]) => [...(prevData ?? []), newUser])
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
