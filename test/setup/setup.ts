import { vi, beforeAll, afterEach, afterAll } from 'vitest'
import '@testing-library/jest-dom/vitest'

import { server } from './server'

Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: vi.fn().mockImplementation((query) => ({
    matches: false,
    media: query,
    onchange: null,
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    dispatchEvent: vi.fn(),
  })),
})

vi.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: (key: string) => key,
  }),
  initReactI18next: {
    type: '3rdParty',
    init: vi.fn(),
  },
}))

beforeAll(() => server.listen())

afterEach(() => server.resetHandlers())

afterAll(() => server.close())
