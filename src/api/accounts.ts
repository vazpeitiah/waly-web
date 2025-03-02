import { AccountCreate, accountSchema } from '@/models/account'
import api from './api'

export const getAccounts = async () => {
  const response = await api.get('/accounts')
  return accountSchema.array().parse(response.data)
}

export const createAccount = async (data: AccountCreate) => {
  const response = await api.post('/accounts', data)
  return accountSchema.parse(response.data)
}

export const deleteAccount = async (id: string) => {
  const response = await api.delete(`/accounts/${id}`)
  return response.data
}
