import { useQuery } from '@tanstack/react-query';
import { fetchWithdrawalReasonTrend } from '../../api/fetchchart';

export const useWithdrawalReasonTrend = (reasonCode: string) => {
  return useQuery({
    queryKey: ['withdrawalReasonTrend', reasonCode],
    queryFn: () => fetchWithdrawalReasonTrend(reasonCode),
    staleTime: 5 * 60 * 1000,
    gcTime: 10 * 60 * 1000,
    enabled: !!reasonCode, // reasonCode가 있을 때만 쿼리 실행
  });
};