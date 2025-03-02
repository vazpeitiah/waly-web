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
