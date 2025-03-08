import { userProfileSchema } from '@/models/user'
import api from './api'

export const getUserProfile = async () => {
  const res = await api.get('/user/profile')
  return userProfileSchema.parse(res.data)
}
