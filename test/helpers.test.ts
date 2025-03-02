import { describe, it, expect } from 'vitest'

import { generateOptions } from '../src/utils/helpers'

describe('helpers', () => {
  it('generate options should return an array of objects', () => {
    const t = (key: string) => key
    const catalog = {
      test: 'Test',
    }

    const res = generateOptions(catalog, 'test', t)

    expect(res).toEqual([{ value: 'Test', label: 'catalogs.test.Test' }])
  })
})
