import { DataTable } from '@/components'
import { columns } from './columns'
import { Category } from '@/models/category'

interface TableProps {
  data: Category[]
}
const Table = ({ data }: TableProps) => {
  return (
    <div>
      <DataTable data={data} columns={columns} />
    </div>
  )
}

export default Table
