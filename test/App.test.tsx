import { describe, it, expect, vi } from 'vitest'
import { screen, render } from '@testing-library/react'

import * as AuthStore from '@/stores/auth'

import App from '../src/App'

describe('App', () => {
  it('should render login title', async () => {
    render(<App />)

    const text = await screen.findByText('login.title')

    expect(text).toBeInTheDocument()
  })

  it('should render home page correctly', async () => {
    const originalUseAuthStore = AuthStore.useAuthStore

    vi.spyOn(AuthStore, 'useAuthStore').mockImplementation(() => ({
      ...originalUseAuthStore(),
      isAuth: true,
    }))

    render(<App />)

    const text = await screen.findByText('app.title')

    expect(text).toBeInTheDocument()
  })
})
