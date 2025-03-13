export const ROUTES = {
  home: '/',
  login: '/login',
  transactions: {
    root: '/transactions',
  },
  accounts: {
    root: '/accounts',
    add: '/accounts/add',
    edit: '/accounts/edit',
  },
  categories: {
    root: '/categories',
    subcategories: '/categories/subcategories',
    add: '/categories/add',
    edit: '/categories/edit',
  },
} as const

export const DEFAULT_LOCALE = 'es'
export const API_URL = import.meta.env.VITE_API_URL
export const MAX_STRING_LENGTH = 255
export const MIN_STRING_LENGTH = 1
export const MIN_PASSWORD_LENGTH = 6

export const QK = {
  accounts: {
    read: 'accounts',
  },
  user: {
    profile: 'user-profile',
  },
  auth: {
    verify: 'auth-verify',
  },
  categories: {
    read: 'categories',
  },
}

export const ACCOUNT_TYPES = {
  bank: 'bank',
  creditCard: 'credit_card',
  cash: 'cash',
  other: 'other',
} as const

export const TRANSACTION_TYPES = {
  income: 'income',
  expense: 'expense',
  transfer: 'transfer',
} as const

/**
 * The default time (in milliseconds) after which cached data is considered stale.
 * This value is set to 5 minutes (1000 milliseconds * 60 seconds * 5 minutes).
 */
export const DEFAULT_STALE_TIME = 1000 * 60 * 5

export const STORE_PERSIST_KEY = {
  auth: 'auth-storage',
}

/**
 * The duration for which a token is valid, in milliseconds.
 * This is set to 60 minutes (1000 milliseconds * 60 seconds * 60 minutes).
 */
export const TOKEN_EXPIRATION = 1000 * 60 * 60

export const QK_ERROR_EXCLUDE = [QK.auth.verify]
