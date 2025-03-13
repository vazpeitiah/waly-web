import { getCategories } from '@/api/categories'
import { QK } from '@/utils/const'
import { useQuery } from '@tanstack/react-query'

const useGetCategories = () => {
  const { data, isSuccess, isLoading } = useQuery({
    queryKey: [QK.categories.read],
    queryFn: getCategories,
  })

  return {
    data,
    isLoading,
    isSuccess,
  }
}

export default useGetCategories
