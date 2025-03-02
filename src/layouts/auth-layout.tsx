import useVerify from '@/queries/auth/useVerify'
import { useAuthStore } from '@/stores/auth'
import { ROUTES } from '@/utils/const'
import { useEffect } from 'react'
import { Outlet, useNavigate } from 'react-router'

const AuthLayout = () => {
  const navigate = useNavigate()
  const { setIsAuth } = useAuthStore()
  const { isSuccess: isValidSession, mutate } = useVerify()

  useEffect(() => {
    mutate()
  }, [mutate])

  useEffect(() => {
    if (isValidSession) {
      setIsAuth(true)
      navigate(ROUTES.home)
    }
  }, [isValidSession, setIsAuth, navigate])

  return (
    <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10">
      <div className="w-full max-w-sm">
        <Outlet />
      </div>
    </div>
  )
}

export default AuthLayout
