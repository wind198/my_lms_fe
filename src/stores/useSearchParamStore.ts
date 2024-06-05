import { defineStore } from 'pinia'
import { computed, reactive, ref } from 'vue'
import { generateRandomId } from '../common/helpers'
import { difference, uniq } from 'lodash-es'
import { useRoute, useRouter, type LocationQueryRaw } from 'vue-router'

const searchParamList = ['page', 'pageSize', 'type', 'sort'] as const

export type ISearchParam = (typeof searchParamList)[number]

const numberValueSearchParamList: ISearchParam[] = ['page', 'pageSize']

const booleanValueSearchParamList: ISearchParam[] = []

const arrayValueSearchParamList: ISearchParam[] = ['sort']

export type ISearchParamMap = Record<ISearchParam, any>

export const useSearchParamStore = defineStore('searchParam', () => {
  const generateDefaultValueOfSearchParams = (): ISearchParamMap => ({
    pageSize: 50,
    page: 1,
    type: null,
    sort: null
  })

  const searchParamMap = reactive<ISearchParamMap>(generateDefaultValueOfSearchParams())

  const getSearchParam = (s: ISearchParam) => searchParamMap[s]

  const getSubsetOfSearchParamMap = computed(() => {
    return (searchParams: ISearchParam[]) => {
      const output = {} as ISearchParamMap
      searchParams.forEach((s) => {
        const match = searchParamMap[s as ISearchParam]
        if (match === null) {
          return
        }
        output[s as ISearchParam] = match
      })

      return output
    }
  })

  const dropDefaultValueSearchParams = (payload: Partial<ISearchParamMap>) => {
    const output: Partial<ISearchParamMap> = {}
    const defaultValues = generateDefaultValueOfSearchParams()
    Object.entries(payload).forEach(([k, v]) => {
      if (v === defaultValues[k as ISearchParam]) {
        return
      }
      output[k as ISearchParam] = v
    })

    return output
  }

  const formatVuerouterQueryToSearchParamMap = (payload: Partial<Record<ISearchParam, string>>) => {
    const output: Partial<ISearchParamMap> = {}

    Object.entries(payload).forEach(([k, v]) => {
      const key = k as ISearchParam
      const rawValue = v as string
      if (!rawValue) {
        return
      }
      let convertVal = undefined
      if (arrayValueSearchParamList.includes(key)) {
        convertVal = Array.isArray(rawValue) ? rawValue : rawValue.split(',')
      } else if (numberValueSearchParamList.includes(key) && !isNaN(parseFloat(rawValue))) {
        convertVal = parseFloat(rawValue)
      } else if (booleanValueSearchParamList.includes(key)) {
        convertVal = rawValue === 'true' ? true : false
      } else {
        convertVal = rawValue
      }
      if (convertVal !== undefined) {
        output[key] = convertVal
      }
    })

    return output
  }

  const setSearchParams = (payload: Partial<ISearchParamMap>) => {
    for (const key in payload) {
      // @ts-expect-error
      searchParamMap[key] = payload[key]
    }
  }

  // const searchParamMapToStr = (payload: Partial<ISearchParamMap>) => {
  //   const queryParts: string[] = []

  //   Object.keys(payload).forEach((key) => {
  //     const k = key as ISearchParam

  //     const $value = payload[k]

  //     if ($value === undefined || $value === null) {
  //       return
  //     }

  //     if (Array.isArray($value)) {
  //       queryParts.push(`${encodeURIComponent(key)}=${encodeURIComponent($value.join(','))}`)
  //     } else {
  //       queryParts.push(`${encodeURIComponent(key)}=${encodeURIComponent($value.toString())}`)
  //     }
  //   })
  //   return queryParts.join('&')
  // }

  // const queryStringToMap = (queryStr: string) => {
  //   if (queryStr.startsWith('?')) {
  //     queryStr = queryStr.slice(1)
  //   }
  //   const keyToRawValueMap = Object.fromEntries(
  //     queryStr.split('&').map((str) => str.split('=').map(decodeURIComponent))
  //   )

  //   const output: Partial<ISearchParamMap> = {}

  //   Object.entries(keyToRawValueMap).map(([k, v]) => {
  //     const key = k as ISearchParam
  //     const rawValue = v as string

  //     let convertVal = undefined
  //     if (arrayValueSearchParamList.includes(key)) {
  //       convertVal = rawValue.split(',')
  //     } else if (numberValueSearchParamList.includes(key) && !isNaN(parseFloat(rawValue))) {
  //       convertVal = parseFloat(rawValue)
  //     } else if (booleanValueSearchParamList.includes(key)) {
  //       convertVal = rawValue === 'true' ? true : false
  //     } else {
  //       convertVal = rawValue
  //     }

  //     if (convertVal !== undefined) {
  //       output[key] = convertVal
  //     }
  //   })
  //   return output
  // }

  const getVueRouterQueryPayload = (payload: Partial<ISearchParamMap>) => {
    const output = {} as LocationQueryRaw
    Object.entries(payload).forEach(([k, v]) => {
      if (v === null || v === undefined) {
        return
      }
      output[k as ISearchParam] = v
    })

    return output
  }

  const isTwoQueryObjectEqual = (q1: Partial<ISearchParamMap>, q2: Partial<ISearchParamMap>) => {
    const q1Keys = Object.keys(q1)
    const q2Keys = Object.keys(q2)
    const isDifferentInKeys = difference(q1Keys, q2Keys).concat(difference(q2Keys, q1Keys))
    if (isDifferentInKeys.length) {
      return false
    }

    let output = true
    for (const key of q1Keys) {
      // @ts-expect-error
      const q1Val = q1[key].toString()
      // @ts-expect-error
      const q2Val = q2[key].toString()
      if (q1Val !== q2Val) {
        output = false
        break
      }
    }

    return output
  }

  return {
    searchParamMap,
    getSubsetOfSearchParamMap,
    dropDefaultValueSearchParams,
    setSearchParams,
    // searchParamMapToStr,
    // queryStringToMap,
    isTwoQueryObjectEqual,
    getVueRouterQueryPayload,
    generateDefaultValueOfSearchParams,
    getSearchParam,
    formatVuerouterQueryToSearchParamMap
  }
})
