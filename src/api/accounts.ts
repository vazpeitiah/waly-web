import { Account, AccountCreate, accountSchema } from '@/models/account'
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
  return accountSchema.parse(response.data)
}

export const updateAccount = async (data: Account) => {
  const response = await api.put(`/accounts/${data.id}`, {
    ...data,
    id: undefined,
  })
  return accountSchema.parse(response.data)
}
