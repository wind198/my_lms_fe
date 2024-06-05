import { useQueryClient } from '@tanstack/vue-query'
import { appLocalStorage } from '../common/singleton/localStorage'

export default function useLogout() {
  const queryClient = useQueryClient()

  const logout = async () => {
    await queryClient.invalidateQueries({ queryKey: ['user-profile'] })
    appLocalStorage.removeJwtToken()
  }

  return { logout }
}
