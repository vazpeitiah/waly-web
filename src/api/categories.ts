import { categorySchema } from '@/models/category'
import api from './api'

export const getCategories = async () => {
  const res = await api.get('/categories')
  return categorySchema.array().parse(res.data)
}
