import { useQueryClient } from '@tanstack/vue-query'
import { appLocalStorage } from '../common/singleton/localStorage'

export default function useLogout() {
  const queryClient = useQueryClient()

  const logout = async () => {
    appLocalStorage.removeJwtToken()
    await queryClient.invalidateQueries({ queryKey: ['user-profile'] })
  }

  return { logout }
}
