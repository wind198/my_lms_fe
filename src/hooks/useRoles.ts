import { useQuery } from '@tanstack/vue-query'
import type { IHasId } from '../common/types'
import useAxiosClient from './useAxiosClient'

export type IRole = IHasId & {
  name: string
  description: string
  type: string
  createdAt: string
  updatedAt: string
}

export default function useRoles() {
  const axiosClient = useAxiosClient()

  const roleQuery = useQuery({
    queryKey: ['roles'],
    queryFn: async () => {
      const { data } = await axiosClient.value.get<{ roles: IRole[] }>(`/users-permissions/roles`)
      return data
    }
  })

  return { ...roleQuery }
}
