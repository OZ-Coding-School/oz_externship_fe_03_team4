import {
  fetchWithdrawals,
  type FetchWithdrawalsParams,
} from '../../api/fetchWithdrawals'
import { useQuery } from '@tanstack/react-query'

export const useWithdrawalQuery = ({
  page,
  limit,
  start_date,
  end_date,
  reason,
  keyword,
  role,
}: FetchWithdrawalsParams) => {
  return useQuery({
    queryKey: [
      'withdrawals',
      page,
      limit,
      start_date,
      end_date,
      reason,
      keyword,
      role,
    ],
    queryFn: () =>
      fetchWithdrawals({
        page,
        limit,
        start_date,
        end_date,
        reason,
        keyword,
        role,
      }),
  })
}
