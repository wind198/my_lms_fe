<script setup lang="ts">
import { onBeforeRouteUpdate, useRoute, useRouter } from 'vue-router'
import type {
  RouteLocationNormalized,
  RouteLocationRaw,
  RouteRecordNormalized,
  onBeforeRouteLeave
} from 'vue-router'
import { useSearchParamStore } from '../../stores/useSearchParamStore.js'
import { merge, uniq } from 'lodash-es'
import { onBeforeMount, ref, watch, watchEffect } from 'vue'

const searchParamStore = useSearchParamStore()

const getRequiredSearchParams = (matched: RouteRecordNormalized[]) => {
  const output = [] as string[]
  matched.forEach(({ meta }) => {
    const requiredSearchParams = (meta?.searchParams ?? []) as string[]
    output.push(...requiredSearchParams)
  })

  return uniq(output)
}

const router = useRouter()

const currentRoute = useRoute()

const currentFullPath = ref<string | null>(null)

const onCurrentFullPathChange = () => {
  const { query, matched, ...o } = currentRoute

  const requiredSearchParams = getRequiredSearchParams(matched)

  const requiredSearchParamValuesFromStore = searchParamStore.getSubsetOfSearchParamMap(
    requiredSearchParams as any
  )

  const mergedSearchParamValues = {
    ...requiredSearchParamValuesFromStore,
    ...searchParamStore.formatVuerouterQueryToSearchParamMap(query)
  }

  searchParamStore.setSearchParams(mergedSearchParamValues)

  const hasChanged = !searchParamStore.isTwoQueryObjectEqual(
    mergedSearchParamValues,
    requiredSearchParamValuesFromStore
  )

  if (!hasChanged) {
    return
  }

  const searchParamsAfterDropDefautValues =
    searchParamStore.dropDefaultValueSearchParams(mergedSearchParamValues)

  router.replace({
    ...o,
    query: searchParamsAfterDropDefautValues
  })
}

onBeforeMount(() => {
  onCurrentFullPathChange()
})

watchEffect(() => {
  currentFullPath.value = currentRoute.fullPath
})

watch(currentFullPath, () => {
  onCurrentFullPathChange()
})

</script>

<template>
  <div class="app-wrapper">
    <RouterView></RouterView>
  </div>
</template>

<style scoped></style>
