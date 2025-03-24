import { categorySchema, CreateCategory } from '@/models/category'
import api from './api'

export const getCategories = async () => {
  const res = await api.get('/categories')
  return categorySchema.array().parse(res.data)
}

export const createCategory = async (data: CreateCategory) => {
  const res = await api.post('/categories', data)
  return categorySchema.parse(res.data)
}
