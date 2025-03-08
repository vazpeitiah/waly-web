import { useEffect } from 'react'
import { Outlet, Navigate } from 'react-router'

import { useVerify } from '@/queries/auth'
import { useAuthStore } from '@/stores/auth'
import { ROUTES } from '@/utils/const'

const PrivateRoute = () => {
  const { isAuth, setIsAuth } = useAuthStore()
  const { isValidSession, isLoading } = useVerify()

  useEffect(() => {
    if (!isValidSession && !isLoading) {
      setIsAuth(false)
    }
  }, [isValidSession, setIsAuth, isLoading])

  if (isLoading) return null

  return isAuth ? <Outlet /> : <Navigate to={ROUTES.login} />
}

export default PrivateRoute
