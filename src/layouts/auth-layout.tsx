import { useAuthStore } from '@/stores/auth'
import { ROUTES } from '@/utils/const'
import { useEffect } from 'react'
import { Outlet, useNavigate } from 'react-router'

const AuthLayout = () => {
  const navigate = useNavigate()
  const { isAuth } = useAuthStore()

  useEffect(() => {
    if (isAuth) {
      navigate(ROUTES.home)
    }
  }, [isAuth, navigate])

  return (
    <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10">
      <div className="w-full max-w-sm">
        <Outlet />
      </div>
    </div>
  )
}

export default AuthLayout
