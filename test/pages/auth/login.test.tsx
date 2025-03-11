import { render, screen } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'
import userEvent from '@testing-library/user-event'
import { http, HttpResponse } from 'msw'

import { Login } from '../../../src/pages'
import { TestWrapper } from '../../setup/wrapper'
import { server } from '../../setup/server'
import { ROUTES } from '@/utils/const'

const mockNavigate = vi.fn()

vi.mock('react-router', async (importOriginal) => {
  const actual = (await importOriginal()) as typeof importOriginal
  return {
    ...actual,
    useNavigate: () => mockNavigate,
  }
})

describe('LoginPage', () => {
  it('should be authenticated an user correctly', async () => {
    const user = userEvent.setup()

    server.use(
      http.post('/auth/login', () => {
        return HttpResponse.json({
          message: 'User is authenticated',
        })
      }),
    )

    render(
      <TestWrapper>
        <Login />
      </TestWrapper>,
    )

    await user.type(screen.getByLabelText('login.email'), 'email@example.com')
    await user.type(screen.getByLabelText('login.password'), 'Hell0Potato.')

    const loginButton = screen.getByRole('button', { name: 'login.submit' })
    await user.click(loginButton)

    expect(mockNavigate).toHaveBeenCalledWith(ROUTES.home)
  })
})
