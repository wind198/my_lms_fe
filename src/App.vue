<script setup lang="ts">
import AppSnackbar from '@/components/app/AppSnackbar.vue'
import { VueQueryDevtools } from '@tanstack/vue-query-devtools'
</script>
<template>
  <RouterView></RouterView>
  <AppSnackbar></AppSnackbar>
  <VueQueryDevtools></VueQueryDevtools>
</template>
<style scoped></style>
