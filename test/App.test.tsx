import { describe, it, expect } from 'vitest'
import { screen, render } from '@testing-library/react'

import App from '../src/App'

describe('App', () => {
  it('should render login title', async () => {
    render(<App />)

    const text = await screen.findByText('login.title')

    expect(text).toBeInTheDocument()
  })
})
