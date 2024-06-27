<script setup lang="ts">
import { upperFirst } from 'lodash-es'
import { textMap } from '../../common/constants/text'
</script>
<template>
  <div class="d-flex flex-column justify-center align-center w-100 h-screen">
    <h1>
      {{ upperFirst(textMap.messages.notFound({ item: textMap.nouns.content }).toLowerCase()) }}
    </h1>
    <p>
      {{ textMap.messages.notFoundLong }}
    </p>
  </div>
</template>
<style scoped></style>
