import { useTranslation } from 'react-i18next'
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '../ui/breadcrumb'
import { Fragment } from 'react'
import { Link, useLocation } from 'react-router'
import { generateBreadcrumbs } from '@/utils/helpers'

const Breadcrumbs = () => {
  const { t } = useTranslation()
  const { pathname } = useLocation()
  const breadcrumbs = generateBreadcrumbs(pathname, true)

  const fixTranslation = (key: string) => {
    const isObject = typeof t(key, { returnObjects: true }) === 'object'
    return isObject ? t(`${key}.root`) : t(key)
  }
  return (
    <Breadcrumb>
      <BreadcrumbList>
        {breadcrumbs.map((breadcrumb, index) => (
          <Fragment key={breadcrumb.url}>
            <BreadcrumbItem>
              {index === breadcrumbs.length - 1 ? (
                <BreadcrumbPage>
                  {fixTranslation(breadcrumb.title)}
                </BreadcrumbPage>
              ) : (
                <Link to={breadcrumb.url}>
                  {fixTranslation(breadcrumb.title)}
                </Link>
              )}
            </BreadcrumbItem>
            {breadcrumbs.indexOf(breadcrumb) < breadcrumbs.length - 1 && (
              <BreadcrumbSeparator />
            )}
          </Fragment>
        ))}
      </BreadcrumbList>
    </Breadcrumb>
  )
}

export default Breadcrumbs
