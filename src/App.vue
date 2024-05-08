<script setup lang="ts">
import { useI18n } from 'vue-i18n'

const { t } = useI18n()
const appTitle = t('$vuetify.appTitle.longTitle')

type IMenuItem = {
  value: string
  link?: string
  children?: IMenuItem[]
}
const leftMenuItemList: IMenuItem[] = [
  { value: 'dashboard', link: '/dashboard' },
  { value: 'business', link: '/business' },
  { value: 'learning', link: '/learning' },
  {
    value: 'management',
    link: '/management',
    children: [
      { value: 'student', link: '/students' },
      { value: 'teacher', link: '/teachers' },
      { value: 'staff', link: '/staff' }
    ]
  }
]
</script>
<template>
  <v-layout class="rounded rounded-md">
    <v-app-bar color="surface-variant" :title="appTitle"></v-app-bar>

    <v-navigation-drawer>
      <v-list>
        <template v-for="item in leftMenuItemList">
          <v-list-item
            v-if="!item.children"
            :key="item.value"
            :to="`${item.link}`"
            :title="t(`$vuetify.noun.${item.value}`)"
          ></v-list-item>
          <v-list-group v-else value="Users" :key="item.value + '_'">
            <template v-slot:activator="{ props }">
              <v-list-item
                :to="`${item.link}`"
                :title="t(`$vuetify.noun.${item.value}`)"
                v-bind="props"
              ></v-list-item>
            </template>
            <v-list-item
              append-icon="mdi-chevron-up"
              v-for="child in item.children"
              :to="`${item.link}${child.link}`"
              :title="t(`$vuetify.noun.${child.value}`)"
              :key="child.value"
            ></v-list-item>
          </v-list-group>
        </template>
      </v-list>
    </v-navigation-drawer>

    <v-navigation-drawer location="right">
      <v-list>
        <v-list-item title="Drawer right"></v-list-item>
      </v-list>
    </v-navigation-drawer>

    <v-main class="d-flex align-center justify-center" style="min-height: 300px">
      Main Content
    </v-main>
  </v-layout>
</template>
<style scoped></style>
