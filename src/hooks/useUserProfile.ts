import { useQuery, useQueryClient } from '@tanstack/vue-query'
import useAxiosClient from './useAxiosClient'
import { appLocalStorage } from '../common/singleton/localStorage'
import { stringify } from 'qs'
import type { IHasId } from '../common/types'

export type IRole = IHasId & {
  name: string
  description: string
  type: string
  createdAt: string
  updatedAt: string
}

export type IUserType = 'admin' | 'teacher' | 'student' | 'staff'

export type IUser = IHasId & {
  username: string
  email: string
  provider: string
  confirmed: boolean
  blocked: boolean
  createdAt: string
  updatedAt: string
  firstName: string
  educationBackground: string
  lastName: string
  phone: string
  type: IUserType
}

export type IUserProfile = IUser & {
  role: IRole
}

export default function useUserProfile() {
  const axiosClient = useAxiosClient()

  const userProfileQuery = useQuery({
    queryKey: ['user-profile'],
    queryFn: async () => {
      const queryObject = {
        populate: ['role']
      }

      const q = stringify(queryObject)

      const { data } = await axiosClient.value.get(`users/me?${q}`)
      return data
    },
    enabled: false
  })

  return userProfileQuery
}
