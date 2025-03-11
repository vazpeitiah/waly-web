import { setupServer } from 'msw/node'
import { http, HttpResponse } from 'msw'

export const handlers = [
  http.get('/auth/verify', () => {
    return HttpResponse.json(
      {
        message: 'User is not authenticated',
      },
      { status: 401 },
    )
  }),
]

export const server = setupServer(...handlers)
