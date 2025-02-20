import { useAuthStore } from '@/stores/auth'
import { ROUTES } from '@/utils/const'
import { Outlet, Navigate } from 'react-router'

const PrivateRoute = () => {
  const { isAuth } = useAuthStore()

  return isAuth ? <Outlet /> : <Navigate to={ROUTES.login} />
}

export default PrivateRoute
