import { render, screen } from '@testing-library/react'
import { beforeEach, describe, expect, it, vi } from 'vitest'
import userEvent from '@testing-library/user-event'
import { http, HttpResponse } from 'msw'

import { AccountForm } from '@/pages'
import { TestWrapper } from '../../../setup/wrapper'
import { server } from '../../../setup/server'
import { ROUTES } from '@/utils/const'
import { Account } from '@/models/account'

const mockNavigate = vi.fn()

const mocks = vi.hoisted(() => {
  return {
    mockSuccess: vi.fn(),
    mockState: null as { account: Account } | null,
  }
})

vi.mock('sonner', async (importOriginal) => {
  const actual = (await importOriginal()) as typeof importOriginal
  return {
    ...actual,
    toast: {
      success: mocks.mockSuccess,
    },
  }
})

vi.mock('react-router', async (importOriginal) => {
  const actual = (await importOriginal()) as typeof importOriginal
  return {
    ...actual,
    useNavigate: () => mockNavigate,
    useLocation: () => ({
      state: mocks.mockState,
    }),
  }
})

vi.mock('@/stores/auth', async () => {
  return {
    useAuthStore: () => ({
      isAuth: true,
      setIsAuth: vi.fn(),
    }),
  }
})

describe('AccountForm', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('should create an account correctly', async () => {
    const requestSpy = vi.fn()
    const user = userEvent.setup()
    server.use(
      http.post('/accounts', async ({ request }) => {
        const body = await request.json()
        requestSpy(body)
        return HttpResponse.json({
          id: 'cm7o6w9xm00014aa22bfoombt',
          name: 'New Account',
          type: 'cash',
        })
      }),
    )

    render(
      <TestWrapper>
        <AccountForm />
      </TestWrapper>,
    )

    await user.type(screen.getByLabelText('accounts.form.name'), 'New Account')
    await user.click(screen.getByLabelText('accounts.form.type'))
    const options = await screen.findAllByText('catalogs.accountTypes.cash')
    /* the options[0] is hidden */
    await user.click(options[1])
    await user.click(screen.getByText('buttons.save'))

    expect(requestSpy).toHaveBeenCalledWith({
      name: 'New Account',
      type: 'cash',
    })
    expect(mockNavigate).toHaveBeenCalledWith(ROUTES.accounts.root)
    expect(mocks.mockSuccess).toHaveBeenCalledWith(
      'Account created successfully',
    )
  })

  it('should update an account correctly', async () => {
    const requestSpy = vi.fn()
    mocks.mockState = {
      account: {
        id: 'cm7o6w9xm00014aa22bfoombt',
        name: 'Account',
        type: 'cash',
      },
    }

    const user = userEvent.setup()
    server.use(
      http.put('/accounts/cm7o6w9xm00014aa22bfoombt', async ({ request }) => {
        const body = await request.json()
        requestSpy(body)
        return HttpResponse.json({
          id: 'cm7o6w9xm00014aa22bfoombt',
          name: 'Updated Account',
          type: 'credit_card',
        })
      }),
    )

    render(
      <TestWrapper>
        <AccountForm />
      </TestWrapper>,
    )

    await user.clear(screen.getByLabelText('accounts.form.name'))
    await user.type(
      screen.getByLabelText('accounts.form.name'),
      'Updated Account',
    )
    await user.click(screen.getByLabelText('accounts.form.type'))
    const options = await screen.findAllByText(
      'catalogs.accountTypes.credit_card',
    )
    /* the options[0] is hidden */
    await user.click(options[1])
    await user.click(screen.getByText('buttons.save'))

    expect(requestSpy).toHaveBeenCalledWith({
      name: 'Updated Account',
      type: 'credit_card',
    })
    expect(mocks.mockSuccess).toHaveBeenCalledWith(
      'Account updated successfully',
    )
    expect(mockNavigate).toHaveBeenCalledWith(ROUTES.accounts.root)
  })
})
