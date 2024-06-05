<script setup lang="ts"></script>
<template>
  <div class="simple-form-layout d-flex flex-column">
    <slot></slot>
  </div>
</template>
<style scoped lang="scss">
.simple-form-layout {
  & > *:not(style):not(:first-child) {
    margin-top: 16px;
  }
}
</style>
