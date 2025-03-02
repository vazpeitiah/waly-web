import { getAccounts } from '@/api/accounts'
import { QK } from '@/utils/const'
import { useQuery } from '@tanstack/react-query'

const useGetAccounts = () => {
  const { data, isSuccess, isLoading } = useQuery({
    queryKey: [QK.accounts.read],
    queryFn: getAccounts,
  })

  return { data, isSuccess, isLoading }
}

export default useGetAccounts
