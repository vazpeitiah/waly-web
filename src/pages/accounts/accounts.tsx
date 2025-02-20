import { useGetAccounts } from '@/queries/accounts'
import { Table } from './table'
import { useTranslation } from 'react-i18next'

const Accounts = () => {
  const { t } = useTranslation()
  const { data, isLoading } = useGetAccounts()
  if (isLoading) {
    return <div>loading...</div>
  }
  return (
    <div>
      <h1 className="text-xl">{t('accounts.title')}</h1>
      {data && <Table data={data} />}
    </div>
  )
}

export default Accounts
