export const ROUTES = {
  home: '/',
  login: '/login',
  transactions: {
    root: '/transactions',
  },
  accounts: {
    root: '/accounts',
  },
  categories: {
    root: '/categories',
    subcategories: '/categories/subcategories',
  },
} as const

export const DEFAULT_LOCALE = 'es'
export const API_URL = import.meta.env.VITE_API_URL
export const MAX_STRING_LENGTH = 255
export const MIN_STRING_LENGTH = 1
export const MIN_PASSWORD_LENGTH = 6
