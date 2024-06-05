import { watchEffect } from 'vue'
import { useSearchParamStore } from '../stores/useSearchParamStore'
import { useRoute, useRouter } from 'vue-router'
import useReplaceWithNewQuery from './useReplaceWithNewQuery'

export default function useAutoResetTablePage(itemCount: number) {
  const searchParamStore = useSearchParamStore()

  const { routerReplaceWithNewQuery } = useReplaceWithNewQuery()

  const page = searchParamStore.getSearchParam('page')
  const pageSize = searchParamStore.getSearchParam('pageSize')

  watchEffect(() => {
    if (page > 1 && itemCount <= (page - 1) * pageSize) {
      // routerReplaceWithNewQuery({ page: 1 })
    }
  })
}
