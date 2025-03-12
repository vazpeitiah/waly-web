import { render, screen } from '@testing-library/react'
import { beforeEach, describe, expect, it, vi } from 'vitest'
import userEvent from '@testing-library/user-event'
import { http, HttpResponse } from 'msw'

import { Accounts } from '@/pages'
import { Account } from '@/models/account'
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
vi.mock('@/stores/auth', async () => {
  return {
    useAuthStore: () => ({
      isAuth: true,
      setIsAuth: vi.fn(),
    }),
  }
})

const accounts: Account[] = [
  {
    id: 'cm7711neb00004a1k14wdftn7',
    name: 'Cash',
    type: 'cash',
  },
  {
    id: 'cm7o6w9xm00014aa22bfoombt',
    name: 'Gold Card',
    type: 'credit_card',
  },
]

describe('Accounts', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('should be list the accounts correctly', async () => {
    server.use(
      http.get('/accounts', () => {
        return HttpResponse.json(accounts)
      }),
    )
    render(
      <TestWrapper>
        <Accounts />
      </TestWrapper>,
    )

    expect(await screen.findByText('Cash')).toBeInTheDocument()
    expect(await screen.findByText('Gold Card')).toBeInTheDocument()
    expect(
      await screen.findByText('catalogs.accountTypes.cash'),
    ).toBeInTheDocument()
    expect(
      await screen.findByText('catalogs.accountTypes.credit_card'),
    ).toBeInTheDocument()
  })

  it('should be able to create a new account', async () => {
    const user = userEvent.setup()
    server.use(
      http.get('/accounts', () => {
        return HttpResponse.json(accounts)
      }),
    )

    render(
      <TestWrapper>
        <Accounts />
      </TestWrapper>,
    )

    await screen.findByText('Cash')
    await user.click(screen.getByText('accounts.add'))

    expect(mockNavigate).toHaveBeenCalledWith(ROUTES.accounts.add)
  })

  it('should be able to edit an account', async () => {
    const user = userEvent.setup()

    server.use(
      http.get('/accounts', () => {
        return HttpResponse.json(accounts)
      }),
    )
    render(
      <TestWrapper>
        <Accounts />
      </TestWrapper>,
    )

    await screen.findByText('Cash')
    const actionsButtons = await screen.findAllByRole('button', {
      name: 'accounts.table.actions.open',
    })

    await user.click(actionsButtons[0])
    await user.click(screen.getByText('accounts.table.actions.edit'))

    expect(mockNavigate).toHaveBeenCalledWith(ROUTES.accounts.edit, {
      state: { account: accounts[0] },
    })
  })
})
