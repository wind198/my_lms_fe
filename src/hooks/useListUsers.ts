import { stringify } from 'qs'
import { useQuery } from '@tanstack/vue-query'
import type { IHasId, IPaginatedData, IPagination } from '../common/types'
import type { AxiosError } from 'axios'
import useAxiosClient from './useAxiosClient'
import { useSearchParamStore } from '../stores/useSearchParamStore'
import { isEmpty } from 'lodash-es'
import type { IUser, IUserType } from './useUserProfile'
import { removeNullUndefineOrEmptyKeyFromObject } from '../common/helpers'
import { computed, watch } from 'vue'

type IStudent = IUser

type IStudentListQueryKey = ['students', IPagination & { type: string; sort: string }]

export function useListUsers({ type }: { type: IUserType }) {
  const axiosClient = useAxiosClient()

  const searchParamStore = useSearchParamStore()

  const sortStr = computed(() => {
    try {
      return (searchParamStore.searchParamMap.sort?.join(',') ?? '') as string
    } catch (error) {
      console.log(searchParamStore.searchParamMap, error)
      return ''
    }
  })

  const page = computed(() => searchParamStore.searchParamMap.page)

  const pageSize = computed(() => searchParamStore.searchParamMap.pageSize)

  const res = useQuery<
    IPaginatedData<IStudent>,
    AxiosError,
    IPaginatedData<IStudent>,
    IStudentListQueryKey
  >({
    placeholderData: (i) => i,
    queryKey: [
      'students',
      {
        type,
        page: page,
        pageSize: pageSize,
        sort: sortStr
      }
    ],
    queryFn: async ({ queryKey }) => {
      const { sort, pageSize, page, type = 'student' } = queryKey[1]

      const queryObj: any = { start: (page - 1) * pageSize, limit: pageSize }

      const filters = {
        ...(type && {
          type: {
            $eq: type
          }
        })
      } as any

      queryObj['filters'] = filters
      queryObj['sort'] = sort?.trim() ? sort.trim().split(',') : null

      const userQueryStr = stringify(removeNullUndefineOrEmptyKeyFromObject(queryObj))

      const userCountQueryStr = stringify(removeNullUndefineOrEmptyKeyFromObject(filters))

      const [{ data: userList }, { data: total }] = await Promise.all([
        await axiosClient.value.get(`users?${userQueryStr}`),
        await axiosClient.value.get(`users/count?${userCountQueryStr}`)
      ])

      return {
        data: userList,
        meta: {
          pagination: {
            page,
            pageSize,
            total,
            pageCount: Math.ceil(total / pageSize)
          }
        }
      }
    }
  })
  return res
}
