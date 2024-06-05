<script setup lang="ts">
import AppBreadcrumbs from '@/components/app/AppBreadcrumbs.vue'
import { VContainer } from 'vuetify/components'
</script>
<template>
  <div class="management-layout pa-1">
    <AppBreadcrumbs></AppBreadcrumbs>
    <VContainer>
      <RouterView></RouterView>
    </VContainer>
  </div>
</template>
<style scoped></style>
