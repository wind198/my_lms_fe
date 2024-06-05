import { watchEffect } from 'vue'
import { useSearchParamStore } from '../stores/useSearchParamStore'
import useReplaceWithNewQuery from './useReplaceWithNewQuery'

export default function useDataTableSearchParamsRelatedEventHandler() {
  const { routerReplaceWithNewQuery } = useReplaceWithNewQuery()

  const onPageUpdate = (value: number): any => {
    routerReplaceWithNewQuery({ page: value })
  }

  const onItemPerPageUpdate = (value: number) => {
    routerReplaceWithNewQuery({ pageSize: value })
  }

  const onUpdateSortBy = (i: { key: string; order: string }[]) => {
    routerReplaceWithNewQuery({
      sort: !i.length ? null : i.map(({ key, order }) => `${key}:${order}`)
    })
  }

  return {
    onUpdateSortBy,
    onPageUpdate,
    onItemPerPageUpdate
  }
}
