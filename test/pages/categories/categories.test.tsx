import { render, screen } from '@testing-library/react'
import { beforeEach, describe, expect, it, vi } from 'vitest'
import userEvent from '@testing-library/user-event'
import { http, HttpResponse } from 'msw'

import { Categories } from '@/pages'
import { TestWrapper } from '../../setup/wrapper'
import { server } from '../../setup/server'
import { ROUTES } from '@/utils/const'
import { Category } from '@/models/category'

const mockNavigate = vi.fn()

const mocks = vi.hoisted(() => {
  return {
    mockSuccess: vi.fn(),
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

const categories: Category[] = [
  {
    id: 'cm7711neb00004a1k14wdftn7',
    name: 'Supermarket',
  },
  {
    id: 'cm7o6w9xm00014aa22bfoombt',
    name: 'Restaurant',
  },
]

describe('Categories Page', () => {
  beforeEach(() => {
    vi.clearAllMocks()
    server.use(
      http.get('/categories', () => {
        return HttpResponse.json(categories)
      }),
    )
  })

  it('should be list the accounts correctly', async () => {
    render(
      <TestWrapper>
        <Categories />
      </TestWrapper>,
    )

    expect(await screen.findByText('Supermarket')).toBeInTheDocument()
    expect(await screen.findByText('Restaurant')).toBeInTheDocument()
  })

  it('should be able to create a new account', async () => {
    const user = userEvent.setup()

    render(
      <TestWrapper>
        <Categories />
      </TestWrapper>,
    )

    await screen.findByText('Supermarket')
    await user.click(screen.getByText('categories.add'))

    expect(mockNavigate).toHaveBeenCalledWith(ROUTES.categories.add)
  })

  it('should be able to edit an account', async () => {
    const user = userEvent.setup()

    render(
      <TestWrapper>
        <Categories />
      </TestWrapper>,
    )

    await screen.findByText('Supermarket')
    const actionsButtons = await screen.findAllByRole('button', {
      name: 'accounts.table.actions.open',
    })

    await user.click(actionsButtons[0])
    await user.click(screen.getByText('accounts.table.actions.edit'))

    expect(mockNavigate).toHaveBeenCalledWith(ROUTES.categories.edit, {
      state: { category: categories[0] },
    })
  })

  it.skip('should be delete an account correctly', async () => {
    const user = userEvent.setup()

    server.use(
      http.delete('/accounts/:id', () => {
        return HttpResponse.json(categories[0])
      }),
    )
    render(
      <TestWrapper>
        <Categories />
      </TestWrapper>,
    )

    await screen.findByText('Cash')
    const actionsButtons = await screen.findAllByRole('button', {
      name: 'accounts.table.actions.open',
    })

    await user.click(actionsButtons[0])
    await user.click(screen.getByText('accounts.table.actions.delete'))

    await user.click(screen.getByText('buttons.confirm'))

    expect(mocks.mockSuccess).toHaveBeenCalledWith('Account deleted')
  })
})
