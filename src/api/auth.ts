import { LoginData } from '@/models/auth'
import api from './api'

export const login = async (data: LoginData) => {
  const res = await api.post('/auth/login', data)
  return res.data
}

export const loginWithGoogle = async () => {
  const res = await api.get('/auth/google')
  const { url } = res.data
  window.location.replace(url)
}

export const verify = async () => {
  const res = await api.get('/auth/verify')
  return res.data
}

export const logout = async () => {
  const res = await api.post('/auth/logout')
  return res.data
}
