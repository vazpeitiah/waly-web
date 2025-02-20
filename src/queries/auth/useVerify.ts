import { verify } from '@/api/auth'
import { useMutation } from '@tanstack/react-query'

export const useVerify = () => {
  const { isSuccess, mutate } = useMutation({
    mutationFn: verify,
  })

  return { isSuccess, mutate }
}

export default useVerify
