import { logout } from '@/api/auth'
import { useAuthStore } from '@/stores/auth'
import { ROUTES } from '@/utils/const'
import { useMutation } from '@tanstack/react-query'

const useLogout = () => {
  const { setIsAuth } = useAuthStore()
  const { isSuccess, mutate, isPending } = useMutation({
    mutationFn: logout,
    onSettled: () => {
      setIsAuth(false)
      window.location.href = ROUTES.login
    },
  })

  return { mutate, isSuccess, isPending }
}

export default useLogout
