import { fetchWithdrawalDetail } from '../../api/fetchWithdrawals'
import { useQuery } from '@tanstack/react-query'

export const useWithdrawalDetailQuery = ({ userId }: { userId: number }) => {
  return useQuery({
    queryKey: ['withdrawalDetail', userId],
    queryFn: () => fetchWithdrawalDetail({ userId }),
  })
}
