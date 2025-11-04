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
}: FetchWithdrawalsParams) => {
  return useQuery({
    queryKey: [page, limit, start_date, end_date, reason, keyword],
    queryFn: () =>
      fetchWithdrawals({ page, limit, start_date, end_date, reason, keyword }),
  })
}
