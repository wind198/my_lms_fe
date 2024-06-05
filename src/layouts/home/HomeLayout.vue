<script setup lang="ts">
import { onBeforeRouteUpdate, useRoute, useRouter } from 'vue-router'
import { textMap } from '../../common/constants/text.js'
import { storeToRefs } from 'pinia'
import { ref, watchEffect } from 'vue'
import {
  ADMIN_MANAGEMENT_ROUTE,
  DASHBOARD_ROUTE,
  LOGIN_ROUTE,
  STUDENT_MANAGEMENT_ROUTE,
  TEACHER_MANAGEMENT_ROUTE
} from '../../router/index.js'
import { useNotificationStore } from '../../stores/useNotificationStore.js'
import { appLocalStorage } from '../../common/singleton/localStorage.js'
import { VAppBar, VContainer, VLayout, VProgressCircular } from 'vuetify/components'
import useUserProfile from '../../hooks/useUserProfile.js'

const appTitle = textMap.appTitle.long

type IMenuItem = {
  value: string
  link?: { name: any }
  children?: IMenuItem[]
}
const leftMenuItemList: IMenuItem[] = [
  { value: 'dashboard', link: { name: DASHBOARD_ROUTE } },
  // { value: 'business', link: '/business' },
  // { value: 'learning', link: '/learning' },
  {
    value: 'management',
    children: [
      { value: 'student', link: { name: STUDENT_MANAGEMENT_ROUTE } },
      { value: 'teacher', link: { name: TEACHER_MANAGEMENT_ROUTE } },
      { value: 'admin', link: { name: ADMIN_MANAGEMENT_ROUTE } }
    ]
  }
]

const currentRoute = useRoute()

watchEffect(() => {
  if (!currentRoute.name) {
    return
  }
  const matchLink = document
    .querySelector('app-left-drawer')
    ?.querySelector(`a[data-value="${currentRoute.name.toString()}"]`)
  if (!matchLink) {
    return
  }
  let startNode = matchLink
  while (true) {
    const parent = startNode.parentElement
    if (!parent) {
      break
    }
    if (parent.classList.contains('app-left-drawer')) {
      break
    }
    if (parent?.classList.contains('v-list-group__items')) {
      parent.style.display = 'block !important'
    }
    startNode = parent
  }
})
</script>
<template>
  <div class="home">
    <VLayout class="rounded rounded-md">
      <VAppBar color="surface-variant" :title="appTitle"></VAppBar>

      <v-navigation-drawer class="app-left-drawer">
        <v-list>
          <template v-for="item in leftMenuItemList" :key="item.value">
            <!-- v-if="!item.children" -->
            <v-list-item
              v-if="!item.children"
              :to="item.link"
              :title="textMap.nouns[item.value]"
            ></v-list-item>
            <v-list-group v-else>
              <template v-slot:activator="{ props }">
                <v-list-item v-bind="props" :title="textMap.nouns[item.value]"></v-list-item>
              </template>
              <v-list-item
                v-for="child in item.children"
                :append-icon="child.children ? 'mdi-chevron-up' : undefined"
                :to="child.link"
                :title="textMap.nouns[child.value]"
                :key="child.value"
                :value="child.value"
                :data-name="child.link?.name"
              ></v-list-item>
            </v-list-group>
          </template>
        </v-list>
      </v-navigation-drawer>

      <v-main style="min-height: 300px">
        <slot />
      </v-main>
    </VLayout>
  </div>
</template>
<style scoped></style>
