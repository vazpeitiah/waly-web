import { useGetAccounts } from '@/queries/accounts'
import { Table } from './table'
import { useTranslation } from 'react-i18next'
import { Button } from '@/components/ui/button'
import { CirclePlus } from 'lucide-react'
import { useNavigate } from 'react-router'
import { ROUTES } from '@/utils/const'

const Accounts = () => {
  const { t } = useTranslation()
  const { data, isLoading } = useGetAccounts()
  const navigate = useNavigate()
  if (isLoading) {
    return <div>loading...</div>
  }
  return (
    <div className="flex flex-col gap-4">
      <div className="flex gap-4 justify-between items-center">
        <h1 className="text-xl">{t('accounts.title')}</h1>
        <Button
          size="sm"
          variant="ghost"
          onClick={() => navigate(ROUTES.accounts.add)}
        >
          <CirclePlus />
          {t('accounts.add')}
        </Button>
      </div>
      {data && <Table data={data} />}
    </div>
  )
}

export default Accounts
