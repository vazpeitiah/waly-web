import { getAccounts } from '@/api/accounts'
import { useQuery } from '@tanstack/react-query'

const useGetAccounts = () => {
  const { data, isSuccess, isLoading } = useQuery({
    queryKey: ['accounts'],
    queryFn: getAccounts,
  })

  return { data, isSuccess, isLoading }
}

export default useGetAccounts
