import { render, screen } from '@testing-library/react'
import { beforeEach, describe, expect, it, vi } from 'vitest'
import userEvent from '@testing-library/user-event'
import { http, HttpResponse } from 'msw'

import { CategoryForm } from '@/pages'
import { TestWrapper } from '../../../setup/wrapper'
import { server } from '../../../setup/server'
import { ROUTES } from '@/utils/const'
import { Category } from '@/models/category'

const mockNavigate = vi.fn()

const mocks = vi.hoisted(() => {
  return {
    mockSuccess: vi.fn(),
    mockState: null as { category: Category } | null,
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
      http.post('/categories', async ({ request }) => {
        const body = await request.json()
        requestSpy(body)
        return HttpResponse.json({
          id: 'cm7o6w9xm00014aa22bfoombt',
          name: 'New Category',
        })
      }),
    )

    render(
      <TestWrapper>
        <CategoryForm />
      </TestWrapper>,
    )

    await user.type(
      screen.getByLabelText('categories.form.name'),
      'New Category',
    )
    await user.click(screen.getByText('buttons.save'))

    expect(requestSpy).toHaveBeenCalledWith({
      name: 'New Category',
    })
    expect(mockNavigate).toHaveBeenCalledWith(ROUTES.categories.root)
    expect(mocks.mockSuccess).toHaveBeenCalledWith('categories.create.success')
  })

  it('should update an account correctly', async () => {
    const requestSpy = vi.fn()
    mocks.mockState = {
      category: {
        id: 'cm7o6w9xm00014aa22bfoombt',
        name: 'Groceries',
      },
    }

    const user = userEvent.setup()
    server.use(
      http.put('/categories/cm7o6w9xm00014aa22bfoombt', async ({ request }) => {
        const body = await request.json()
        requestSpy(body)
        return HttpResponse.json({
          id: 'cm7o6w9xm00014aa22bfoombt',
          name: 'Food & Groceries',
        })
      }),
    )

    render(
      <TestWrapper>
        <CategoryForm />
      </TestWrapper>,
    )

    await user.clear(screen.getByLabelText('categories.form.name'))
    await user.type(
      screen.getByLabelText('categories.form.name'),
      'Food & Groceries',
    )
    await user.click(screen.getByText('buttons.save'))

    expect(requestSpy).toHaveBeenCalledWith({
      name: 'Food & Groceries',
    })
    expect(mocks.mockSuccess).toHaveBeenCalledWith('categories.update.success')
    expect(mockNavigate).toHaveBeenCalledWith(ROUTES.categories.root)
  })
})
