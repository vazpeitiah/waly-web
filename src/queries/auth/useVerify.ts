import { verify } from '@/api/auth'
import { QK, TOKEN_EXPIRATION } from '@/utils/const'
import { useQuery } from '@tanstack/react-query'

export const useVerify = () => {
  const { isSuccess, isFetching } = useQuery({
    queryKey: [QK.auth.verify],
    queryFn: verify,
    staleTime: TOKEN_EXPIRATION,
  })

  return { isValidSession: isSuccess, isLoading: isFetching }
}

export default useVerify
