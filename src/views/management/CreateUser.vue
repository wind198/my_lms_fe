<script setup lang="ts">
import {
  educationBackgroundOptions,
  userTypeOptions as $typeOptions,
  IS_DEV
} from '@/common/constants'
import { textMap } from '@/common/constants/text'
import { uppercaseFirstLetter } from '@/common/helpers'
import { validationRules } from '@/common/helpers/validations'
import BaseForm from '@/components/base/BaseForm.vue'
import useAxiosClient from '@/hooks/useAxiosClient'
import useCreateUser, { type ICreateUserFormData } from '@/hooks/useCreateUser'
import type { IUserType } from '@/hooks/useUserProfile'
import { debounce, startCase, upperFirst } from 'lodash-es'
import { stringify } from 'qs'
import { computed, reactive, ref } from 'vue'
import { VContainer, VSelect, VTextField } from 'vuetify/components'
import useRoles from '../../hooks/useRoles'
import { useNotificationStore } from '../../stores/useNotificationStore'

type ICreateUserFormDataTruncated = Omit<ICreateUserFormData, 'username' | 'role'>

const props = defineProps<{ type: IUserType }>()

const educationOptions = educationBackgroundOptions.map((i) => ({
  title: textMap.nouns[i] ?? i,
  value: i
}))

const typeOptions = $typeOptions.map((i) => ({
  // @ts-expect-error
  title: textMap.nouns[i] ?? i,
  value: i
}))

const axiosClient = useAxiosClient()

const notiStore = useNotificationStore()

const createUserMutation = useCreateUser()

const { data: roleList } = useRoles()

const form = reactive<ICreateUserFormDataTruncated>(
  IS_DEV
    ? {
        email: 'tuan.le2@niteco.se',
        password: 'Abcd1234',
        firstName: 'Lê',
        lastName: 'Hoàng Tuấn',
        phone: '0968576908',
        educationBackground: 'graduate',
        type: 'admin'
      }
    : {
        email: '',
        password: '',
        firstName: '',
        lastName: '',
        phone: '',
        educationBackground: 'highschool',
        type: 'student'
      }
)

const isFormValid = ref(true)

const emailFieldRef = ref<VTextField | null>(null)

const formRef = ref<any>(null)

const usedEmails = ref<string[]>([])

const onSubmit = async (data: any) => {
  isFormValid.value = data.valid
  if (!data.valid) {
    return
  }

  const matchRole = roleList.value?.roles?.find((r) => r.type === form.type)
  if (!matchRole) {
    return
  }

  const formData: ICreateUserFormDataTruncated = {
    email: form.email,
    password: form.password,
    firstName: form.firstName,
    lastName: form.lastName,
    phone: form.phone,
    educationBackground: form.educationBackground,
    type: form.type
  }
  await createUserMutation.mutateAsync({
    ...formData,
    role: matchRole.id
  })
  notiStore.openNotification(textMap.messages.success({ action: textMap.verbs.create }), 'success')
}

const checkDupplicatedEmail = async (v: string) => {
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
  const isValidEmail = validationRules.email()(v)
  if (isValidEmail !== true) return

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
            :label="textMap.nouns.lastName"
            :rules="[validationRules.required()]"
            required
          ></VTextField>
        </div>
        <VTextField v-model="form.phone" :label="textMap.nouns.phone"></VTextField>
        <VSelect
          v-model="form.educationBackground"
          :items="educationOptions"
          :label="textMap.nouns.educationBackground"
          required
          :rules="[validationRules.required()]"
        ></VSelect>
        <VSelect
          :rules="[validationRules.required()]"
          v-model="form.type"
          :items="typeOptions"
          :label="textMap.nouns.type"
          required
        ></VSelect>
      </BaseForm>
    </VSheet>
  </div>
</template>
<style scoped></style>
