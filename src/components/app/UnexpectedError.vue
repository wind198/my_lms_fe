<script setup lang="ts">
import { textMap } from '@/common/constants/text'
</script>
<template>
  <div class="d-flex flex-column justify-center align-center w-100 h-screen">
    <h1>{{ textMap.messages.error }}</h1>
    <p>
      {{ textMap.messages.errorLong }}
    </p>
  </div>
</template>
<style scoped></style>
