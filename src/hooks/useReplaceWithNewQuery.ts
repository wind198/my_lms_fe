import { useRoute, useRouter } from 'vue-router'
import type { ISearchParamMap } from '../stores/useSearchParamStore'

export default function useReplaceWithNewQuery() {
  const currentRoute = useRoute()

  const router = useRouter()

  const routerReplaceWithNewQuery = (payload: Partial<ISearchParamMap>) => {
    router.replace({ ...currentRoute, query: { ...currentRoute.query, ...payload } })
  }

  return { routerReplaceWithNewQuery }
}
