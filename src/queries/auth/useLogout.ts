import { logout } from '@/api/auth'
import { useAuthStore } from '@/stores/auth'
import { useMutation } from '@tanstack/react-query'

const useLogout = () => {
  const { setIsAuth } = useAuthStore()
  const { isSuccess, mutate, isPending } = useMutation({
    mutationFn: logout,
    onSuccess: () => {
      setIsAuth(false)
    },
  })

  return { mutate, isSuccess, isPending }
}

export default useLogout
