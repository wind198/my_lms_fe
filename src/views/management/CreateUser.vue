<script setup lang="ts">
import { educationBackgroundOptions, typeOptions as $typeOptions } from '@/common/constants'
import { textMap } from '@/common/constants/text'
import { uppercaseFirstLetter } from '@/common/helpers'
import { validationRules } from '@/common/helpers/validations'
import BaseForm from '@/components/base/BaseForm.vue'
import useAxiosClient from '@/hooks/useAxiosClient'
import useCreateUser from '@/hooks/useCreateUser'
import type { IUserType } from '@/hooks/useUserProfile'
import { debounce, startCase, upperFirst } from 'lodash-es'
import { stringify } from 'qs'
import { computed, reactive, ref } from 'vue'
import { VContainer, VSelect, VTextField } from 'vuetify/components'

const props = defineProps<{ type: IUserType }>()

const educationOptions = educationBackgroundOptions.map((i) => ({
  title: upperFirst(startCase(i).toLowerCase()),
  value: i
}))

const typeOptions = $typeOptions.map((i) => ({
  title: upperFirst(startCase(i).toLowerCase()),
  value: i
}))

const axiosClient = useAxiosClient()

const createUserMutation = useCreateUser()

const form = reactive({
  username: '',
  email: '',
  password: '',
  firstName: '',
  lastName: '',
  phone: '',
  educationBackground: '',
  type: ''
})

const isFormValid = ref(true)

const emailFieldRef = ref<VTextField | null>(null)

const formRef = ref<any>(null)

const usedEmails = ref<string[]>([])

const onSubmit = (data: any) => {
  isFormValid.value = data.valid
  if (!data.valid) {
    return
  }
}

const checkDupplicatedEmail = async (v: string) => {
  console.log('check dupplication')
  try {
    const { data } = await axiosClient.value.get(`users/count?${stringify({ email: { $eq: v } })}`)
    if (data) {
      usedEmails.value.push(v)
      const form = formRef.value
      form?.validate()
    }
  } catch (error) {
    console.error(error)
  }
}

const onUpdateEmail = debounce(async (v: string) => {
  await checkDupplicatedEmail(v)
}, 250)

const noDuplicate = (v: string) => {
  return (
    !usedEmails.value.includes(v.trim()) ||
    textMap.validations.duplicated({ item: textMap.nouns.email })
  )
}
</script>
<template>
  <div>
    <VSheet class="pa-4">
      <h3 class="text-h6 mb-2">Create {{ props.type }}</h3>
      <BaseForm ref="formRef" @submit="onSubmit">
        <VTextField
          ref="emailFieldRef"
          v-model="form.email"
          :label="textMap.nouns.email"
          :rules="[validationRules.required(), validationRules.email(), noDuplicate]"
          required
          validate-on="input lazy"
          @update:modelValue="onUpdateEmail"
        ></VTextField>
        <VTextField
          v-model="form.password"
          :label="textMap.nouns.password"
          :rules="[validationRules.required(), validationRules.minLength(6)]"
          required
        ></VTextField>
        <div class="d-flex">
          <VTextField
            class="mr-2"
            v-model="form.firstName"
            :label="textMap.nouns.firstName"
            :rules="[validationRules.required()]"
            required
          ></VTextField>
          <VTextField
            v-model="form.lastName"
            :label="textMap.nouns.firstName"
            :rules="[validationRules.required()]"
            required
          ></VTextField>
        </div>
        <VTextField v-model="form.phone" label="Phone"></VTextField>
        <VSelect
          v-model="form.educationBackground"
          :items="educationOptions"
          :label="textMap.nouns.firstName"
          required
          :rules="[validationRules.required()]"
        ></VSelect>
        <VSelect
          :rules="[validationRules.required()]"
          v-model="form.type"
          :items="typeOptions"
          label="Type"
          required
        ></VSelect>
      </BaseForm>
    </VSheet>
  </div>
</template>
<style scoped></style>
