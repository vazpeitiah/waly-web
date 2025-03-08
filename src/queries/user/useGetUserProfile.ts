import { getUserProfile } from '@/api/user'
import { QK } from '@/utils/const'
import { useQuery } from '@tanstack/react-query'

const useGetUserProfile = () => {
  const { data, isLoading, isSuccess, isPending, isFetching } = useQuery({
    queryKey: [QK.user.profile],
    queryFn: getUserProfile,
  })

  return {
    data,
    isLoading,
    isSuccess,
    isPending,
    isFetching,
  }
}

export default useGetUserProfile
