import { describe, it, expect } from 'vitest'

import {
  generateAvatarFallback,
  generateBreadcrumbs,
  generateOptions,
} from '../../src/utils/helpers'

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

describe('generateBreadcrumbs', () => {
  it('should return an array of strings with current path', () => {
    const res = generateBreadcrumbs('/test/path', true)
    expect(res).toEqual([
      {
        title: 'breadcrumbs.home',
        url: '/',
      },
      {
        title: 'breadcrumbs.test',
        url: '/test',
      },
      {
        title: 'breadcrumbs.test.path',
        url: '/test/path',
      },
    ])
  })

  it('should return an array of strings without current path', () => {
    const res = generateBreadcrumbs('/test/path', false)
    expect(res).toEqual([
      {
        title: 'breadcrumbs.home',
        url: '/',
      },
      {
        title: 'breadcrumbs.test',
        url: '/test',
      },
    ])
  })

  it('should return an empty array when the pathname is "/" & not include current path', () => {
    const res = generateBreadcrumbs('/', false)
    expect(res).toEqual([])
  })
})

describe('generateAvatarFallback', () => {
  it('should return a string with the first two letters of the name', () => {
    const res = generateAvatarFallback('John Doe')
    expect(res).toBe('JD')
  })

  it('should return a string with the first letter of the name', () => {
    const res = generateAvatarFallback('John')
    expect(res).toBe('J')
  })

  it('should return an empty string when the name is empty', () => {
    const res = generateAvatarFallback('')
    expect(res).toBe('')
  })

  it('should return a string with the first two letters of the name when the name has more than two words', () => {
    const res = generateAvatarFallback('John Doe Smith')
    expect(res).toBe('JD')
  })
})
