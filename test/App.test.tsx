import { describe, it, expect, vi } from 'vitest'
import { screen, render } from '@testing-library/react'

import * as AuthStore from '@/stores/auth'

import App from '../src/App'
import userEvent from '@testing-library/user-event'
import { server } from './setup/server'
import { http, HttpResponse } from 'msw'

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

  it('should be make the logout correctly', async () => {
    const originalUseAuthStore = AuthStore.useAuthStore
    const user = userEvent.setup()
    const setIsAuthSpy = vi.fn()
    vi.spyOn(AuthStore, 'useAuthStore').mockImplementation(() => ({
      ...originalUseAuthStore(),
      user: {
        email: 'test@example.com',
        name: 'Test User',
      },
      isAuth: true,
      setIsAuth: setIsAuthSpy,
    }))

    server.use(
      http.post('/auth/logout', () => {
        return HttpResponse.json({
          message: 'Logout successfully',
        })
      }),
    )

    render(<App />)

    await screen.findByText('app.title')
    await user.click(await screen.findByText('Test User'))
    await user.click(await screen.findByText('navUser.logout'))

    expect(setIsAuthSpy).toHaveBeenCalledWith(false)
  })

  it('should render not found page correctly', async () => {
    window.history.pushState({}, 'Not Found', '/not-found')
    render(<App />)

    const text = await screen.findByText('notFound.title')

    expect(text).toBeInTheDocument()
  })
})
