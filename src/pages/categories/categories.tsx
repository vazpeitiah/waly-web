import { Button } from '@/components/ui/button'
import useGetCategories from '@/queries/categories/useGetCategories'
import { ROUTES } from '@/utils/const'
import { CirclePlus } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router'
import { Table } from './table'

const Categories = () => {
  const navigate = useNavigate()
  const { t } = useTranslation()
  const { data } = useGetCategories()

  return (
    <div className="flex flex-col gap-4">
      <div className="flex gap-4 justify-between items-center">
        <h1 className="text-xl">{t('categories.title')}</h1>
        <Button
          size="sm"
          variant="ghost"
          onClick={() => navigate(ROUTES.categories.add)}
        >
          <CirclePlus />
          {t('categories.add')}
        </Button>
      </div>
      {data && <Table data={data} />}
    </div>
  )
}

export default Categories
