<script setup lang="ts"></script>
<template>
  <div class="w-100 h-screen d-flex bg-sheet align-stretch">
    <div class="flex-fill bg-primary" style="width: 50%"></div>
    <div class="flex-fill d-flex flex-column justify-center" style="width: 50%">
      <slot></slot>
    </div>
  </div>
</template>
<style scoped></style>
