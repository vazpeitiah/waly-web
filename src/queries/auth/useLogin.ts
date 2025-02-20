import { login } from '@/api/auth'
import { useAuthStore } from '@/stores/auth'
import { ROUTES } from '@/utils/const'
import { useMutation } from '@tanstack/react-query'
import { useNavigate } from 'react-router'

const useLogin = () => {
  const navigate = useNavigate()
  const { setIsAuth } = useAuthStore()
  const { mutate, isPending, isSuccess, isError } = useMutation({
    mutationFn: login,
    onSuccess: () => {
      navigate(ROUTES.home)
      setIsAuth(true)
    },
  })

  return {
    mutate,
    isPending,
    isSuccess,
    isError,
  }
}

export default useLogin
