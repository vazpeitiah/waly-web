import { logout } from '@/api/auth'
import { useAuthStore } from '@/stores/auth'
import { ROUTES } from '@/utils/const'
import { useMutation } from '@tanstack/react-query'
import { useNavigate } from 'react-router'

const useLogout = () => {
  const navigate = useNavigate()
  const { setIsAuth } = useAuthStore()
  const { isSuccess, mutate, isPending } = useMutation({
    mutationFn: logout,
    onSettled: () => {
      setIsAuth(false)
      navigate(ROUTES.login)
    },
  })

  return { mutate, isSuccess, isPending }
}

export default useLogout
