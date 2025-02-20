import { DataTable } from '@/components'
import { columns } from './columns'
import { Account } from '@/models/account'

interface TableProps {
  data: Account[]
}
const Table = ({ data }: TableProps) => {
  return (
    <div>
      <DataTable data={data} columns={columns} />
    </div>
  )
}

export default Table
