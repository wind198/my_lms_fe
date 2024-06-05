<script setup lang="ts">
import AuthLayout from '@/layouts/auth/AuthLayout.vue'
import { reactive, ref } from 'vue'
import { VForm } from 'vuetify/components'
import { useValidationRules } from '../../../hooks/useValidationRules.js'
import useLogin from '../../../hooks/useLogin.js'
import { textMap } from '../../../common/constants/text.js'

const { required } = useValidationRules()

const { isPending, mutateAsync } = useLogin()

const formData = reactive({
  email: '',
  password: ''
})
const loginForm = ref(null)

async function onSubmit() {
  const res = await (loginForm.value! as VForm)?.validate()
  if (!res.valid) {
    return
  }
  await mutateAsync(formData)
}
</script>
<template>
  <AuthLayout>
    <VForm ref="loginForm" class="login-form pa-3" @submit.prevent="onSubmit" lazy-validation>
      <div class="text-subtitle-1 mb-4">
        <p class="text-h6">{{ textMap.messages.welcome }}</p>
        <p class="text-body-1">{{ textMap.messages.pleaseLogin }}</p>
      </div>
      <VTextField
        :rules="[required()]"
        type="email"
        density="compact"
        variant="outlined"
        :label="textMap.nouns.email"
        v-model="formData.email"
        required
        :hide-details="false"
        class="mb-2"
      ></VTextField>
      <VTextField
        required
        :rules="[required()]"
        type="password"
        density="compact"
        variant="outlined"
        :label="textMap.nouns.password"
        v-model="formData.password"
        :hide-details="false"
      ></VTextField>
      <v-btn flat color="primary" type="submit" class="mt-3" :loading="isPending">
        {{ textMap.verbs.login }}
      </v-btn>
    </VForm>
  </AuthLayout>
</template>
<style scoped lang="scss">
.login-form {
  min-height: 600px;
  max-width: 600px;
}
</style>
