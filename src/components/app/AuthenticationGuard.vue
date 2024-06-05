<script setup lang="ts">
import { useRouter, onBeforeRouteUpdate } from 'vue-router'
import type { NavigationGuardNext, RouteLocationNormalized } from 'vue-router'
import { appLocalStorage } from '../../common/singleton/localStorage.js'
import { LOGIN_ROUTE } from '../../router/index.js'
import useUserProfile from '../../hooks/useUserProfile.js'
import NotFound from './NotFound.vue'
import { watchEffect } from 'vue'
import HomeLayout from '@/layouts/home/HomeLayout.vue'

const router = useRouter()

const userProfileQuery = useUserProfile()

watchEffect(async () => {
  const jwtToken = appLocalStorage.getJwtToken()
  if (!jwtToken) {
    router.push({ name: LOGIN_ROUTE })
    return
  }
  if (!userProfileQuery.data.value) {
    await userProfileQuery.refetch()
  }
})
</script>
<template>
  <div class="authentication-guard bg-grey-lighten-5">
    <div
      v-if="userProfileQuery.isLoading.value"
      class="width-100 h-screen d-flex justify-center align-center"
    >
      <VProgressCircular color="primary" indeterminate></VProgressCircular>
    </div>
    <NotFound v-else-if="userProfileQuery.isError.value"></NotFound>
    <HomeLayout v-else>
      <RouterView></RouterView>
    </HomeLayout>
  </div>
</template>
<style scoped></style>
