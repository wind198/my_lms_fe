<script setup lang="ts">
import { computed, ref, watchEffect } from 'vue'
import { useRoute, type RouteLocationMatched } from 'vue-router'
import { VBreadcrumbs } from 'vuetify/components'
import { DASHBOARD_ROUTE } from '../../router'

const currentRoute = useRoute()

const routeList = ref<RouteLocationMatched[]>([])

watchEffect(() => {
  const matchedRoutes = currentRoute.matched
  const routesWithTitleAndName = matchedRoutes.filter((i) => i.name && i.meta?.title)
  routeList.value = routesWithTitleAndName
})

const breadcrumbsItems = computed(() => {
  const $routeList = [...routeList.value].map((i) => ({
    title: i.meta.title! as string,
    to: { name: i.name! }
  }))
  if (!$routeList.find((i) => i.to.name === DASHBOARD_ROUTE)) {
    $routeList.unshift({ title: 'Dashboard', to: { name: DASHBOARD_ROUTE } })
  }

  return $routeList
})
</script>
<template>
  <VBreadcrumbs :items="breadcrumbsItems" divider="-"></VBreadcrumbs>
</template>
<style scoped></style>
