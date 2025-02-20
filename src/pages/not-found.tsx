import { useTranslation } from 'react-i18next'

import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'

const NotFound = () => {
  const { t } = useTranslation()

  return (
    <div className="min-h-svh w-full p-6 md:p-10 flex items-center justify-center">
      <div className="w-full max-w-sm">
        <Card>
          <CardHeader>
            <CardTitle className="text-2xl mb-2">
              {t('notFound.title')}
            </CardTitle>
            <CardDescription className="text-md">
              {t('notFound.description')}
            </CardDescription>
          </CardHeader>
        </Card>
      </div>
    </div>
  )
}

export default NotFound
