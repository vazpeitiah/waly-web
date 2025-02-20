import { API_URL } from '@/utils/const'
import axios from 'axios'

const api = axios.create({
  baseURL: API_URL,
  withCredentials: true,
})

export default api
