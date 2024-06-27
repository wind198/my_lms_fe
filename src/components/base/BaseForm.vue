<script setup lang="ts">
import { VBtn, VForm, VTextField } from 'vuetify/components'
import { textMap } from '@/common/constants/text'
import { computed, ref } from 'vue'
const props = defineProps<{ primaryText?: string; secondaryText?: string }>()

const emit = defineEmits(['submit'])
const primaryText = computed(() => props.primaryText || textMap.verbs.create)
const secondaryText = computed(() => props.primaryText || textMap.verbs.cancel)

const formRef = ref<VForm | null>(null)

const onSubmit = async () => {
  const formComponent = formRef.value
  if (!formComponent) {
    return
  }

  emit('submit', await formComponent.validate())
}

const validate = () => {
  onSubmit()
}

defineExpose({ validate })
</script>
<template>
  <VForm ref="formRef" validate-on="lazy input" @submit.prevent="onSubmit">
    <slot></slot>
    <div class="form-actions d-flex flex-end align-center">
      <VBtn flat color="default"> {{ secondaryText }} </VBtn>
      <VBtn flat color="primary" type="submit"> {{ primaryText }} </VBtn>
    </div>
  </VForm>
</template>
<style scoped></style>
