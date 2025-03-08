import { BreadcrumbItem } from './types'

/**
 * Generates an array of options from a catalog object.
 *
 * @param catalog - An object where keys are strings and values are strings representing catalog items.
 * @param title - A string representing the title of the catalog.
 * @param t - A translation function that takes a key and returns a translated string.
 * @returns An array of objects, each containing a `value` and `label` property.
 */
export const generateOptions = (
  catalog: Record<string, string>,
  title: string,
  t: (key: string) => string,
) => {
  return Object.values(catalog).map((type) => ({
    value: type,
    label: t(`catalogs.${title}.${type}`),
  }))
}

/**
 * Generates an array of breadcrumb items based on the given pathname.
 *
 * @param pathname - The current path from which to generate breadcrumbs.
 * @param includeCurrentPath - A boolean indicating whether to include the current path as the last breadcrumb. Defaults to `false`.
 * @returns An array of breadcrumb items, each containing a title and a URL.
 *
 * @example
 * ```typescript
 * generateBreadcrumbs('/home/products/electronics', true);
 * // Returns:
 * // [
 * //   { title: 'breadcrumbs.home', url: '/' },
 * //   { title: 'breadcrumbs.home.products', url: '/home/products' },
 * //   { title: 'breadcrumbs.home.products.electronics', url: '/home/products/electronics' }
 * // ]
 * ```
 */
export const generateBreadcrumbs = (
  pathname: string,
  includeCurrentPath: boolean = false,
): BreadcrumbItem[] => {
  const segments = pathname.split('/').filter(Boolean)
  const partialBreadcrumbs = segments.map(
    (_, i) => '/' + segments.slice(0, i + 1).join('/'),
  )
  const breadcrumbs = includeCurrentPath
    ? ['/', ...partialBreadcrumbs]
    : ['/', ...partialBreadcrumbs].slice(0, -1)
  return breadcrumbs.map<BreadcrumbItem>((breadcrumb) => {
    const title = breadcrumb.replace(/\//g, '.').slice(1) || 'home'
    return {
      title: `breadcrumbs.${title}`,
      url: breadcrumb,
    }
  })
}

export const generateAvatarFallback = (name: string) => {
  return name
    .split(' ')
    .map((word) => word[0])
    .join('')
    .toUpperCase()
}
