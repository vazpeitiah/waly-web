import { accountSchema } from '@/models/account'
import api from './api'

export const getAccounts = async () => {
  const response = await api.get('/accounts')
  return accountSchema.array().parse(response.data)
}
