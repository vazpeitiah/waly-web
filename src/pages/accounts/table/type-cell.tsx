import { Account } from '@/models/account'
import { ACCOUNT_TYPES } from '@/utils/const'
import { generateOptions } from '@/utils/helpers'
import { useTranslation } from 'react-i18next'

interface TypeCellProps {
  row: Account
}

const TypeCell = ({ row }: TypeCellProps) => {
  const { t } = useTranslation()
  const accountTypes = generateOptions(ACCOUNT_TYPES, 'accountTypes', t)
  const type = accountTypes.find((type) => type.value === row.type)
  return <span>{type?.label}</span>
}

export default TypeCell
