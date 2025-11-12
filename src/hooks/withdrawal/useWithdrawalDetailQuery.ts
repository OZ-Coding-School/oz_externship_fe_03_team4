import { fetchWithdrawalDetail } from '../../api/fetchWithdrawals'
import { useQuery } from '@tanstack/react-query'

type Params = {
  userId?: number
  enabled?: boolean
}

export const useWithdrawalDetailQuery = ({
  userId,
  enabled = true,
}: Params) => {
  return useQuery({
    queryKey: ['withdrawalDetail', userId],
    queryFn: () => fetchWithdrawalDetail({ userId: userId! }),
    enabled: enabled && !!userId,
  })
}
