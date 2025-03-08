import { UserProfile } from '@/models/user'
import { STORE_PERSIST_KEY } from '@/utils/const'
import { create } from 'zustand'
import { persist } from 'zustand/middleware'

interface AuthState {
  isAuth: boolean
  setIsAuth: (isAuth: boolean) => void
  user?: UserProfile
  setUser: (user: UserProfile) => void
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      isAuth: false,
      setIsAuth: (isAuth) => set({ isAuth }),
      setUser: (user) => set({ user }),
    }),
    { name: STORE_PERSIST_KEY.auth },
  ),
)
