<script setup lang="ts">
import { useNotificationStore } from '@/stores/useNotificationStore.js'
import { VSlideYTransition, VSnackbar, VIcon } from 'vuetify/components'

const notificationStore = useNotificationStore()
</script>

<template>
  <VSlideYTransition
    group
    tag="v-list"
    class="stack-noti position-fixed bottom-0 py-0 d-flex flex-column"
  >
    <VAlert
      v-for="(noti, i) in notificationStore.notificationList"
      :key="noti.id"
      :color="noti.status"
      class="notificaton-alert mb-2"
      density="compact"
      border="start"
      :text="noti.message"
      closable
      close-label="Close"
      :icon="`$${noti.status}`"
      @click:close="notificationStore.closeNotification(noti.id)"
    >
    </VAlert>
  </VSlideYTransition>
</template>

<style scoped>
.stack-noti {
  left: 50%;
  transform: translate(-50%, -24px);
}
</style>
