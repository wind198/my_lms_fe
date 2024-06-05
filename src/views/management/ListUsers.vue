<script setup lang="ts">
import useDataTableSearchParamsRelatedEventHandler from '@/hooks/useDataTableSearchParamsRelatedEventHandler'
import { useListUsers } from '@/hooks/useListUsers'
import { useSearchParamStore } from '@/stores/useSearchParamStore'
import useAutoResetTablePage from '../../hooks/useAutoResetTablePage'
import type { IUserType } from '@/hooks/useUserProfile'
import { uppercaseFirstLetter } from '@/common/helpers'
import { computed, watch } from 'vue'
import { storeToRefs } from 'pinia'
import { VBtn, VDataTableServer, VSheet, VToolbar } from 'vuetify/components'
import { STUDENT_CREATE_ROUTE } from '@/router'

const props = defineProps<{ type: IUserType }>()

const { searchParamMap } = storeToRefs(useSearchParamStore())

const { data, isLoading, isRefetching } = useListUsers({ type: props.type })

const { onPageUpdate, onItemPerPageUpdate, onUpdateSortBy } =
  useDataTableSearchParamsRelatedEventHandler()

useAutoResetTablePage(data.value?.meta.pagination.total || 0)

const headers = [
  { sortable: true, title: 'Id', value: 'id' },
  { sortable: true, title: 'Username', value: 'username' },
  { sortable: true, title: 'First name', value: 'firstName' },
  { sortable: true, title: 'Last name', value: 'lastName' },
  { sortable: true, title: 'Added at', value: 'createdAt' },
  { sortable: true, title: 'Phone', value: 'phone' },
  { sortable: true, title: 'Address', value: 'address' },
  { sortable: true, title: 'Education background', value: 'educationBackground' }
]
</script>
<template>
  <VSheet class="pa-4">
    <div class="d-flex mb-2 align-center">
      <h3 class="text-h6">{{ uppercaseFirstLetter(props.type) }} list</h3>
      <div class="flex-fill"></div>
      <VProgressCircular v-if="isRefetching"></VProgressCircular>
      <VBtn :to="{ name: STUDENT_CREATE_ROUTE }" color="primary" flat> Add </VBtn>
    </div>
    <!-- <div v-if="isLoading && !data">
      <VSkeletonLoader type="table"></VSkeletonLoader>
    </div> -->
    <VDataTableServer
      :loading="isLoading && !data"
      :items-length="data?.meta.pagination.total || 0"
      disable-sort
      height="calc(100vh - 300px)"
      fixed-header
      :items="data?.data"
      :headers="headers"
      :page="searchParamMap.page"
      :items-per-page="searchParamMap.pageSize"
      @update:page="onPageUpdate"
      @update:items-per-page="onItemPerPageUpdate"
      @update:sort-by="onUpdateSortBy"
    >
    </VDataTableServer>
  </VSheet>
</template>
<style scoped></style>
