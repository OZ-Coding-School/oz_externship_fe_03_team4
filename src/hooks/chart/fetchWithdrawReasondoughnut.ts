import { useQuery } from '@tanstack/react-query';
import { fetchWithdrawalReasons } from '../../api/fetchchart';

export const useWithdrawalReasons = () => {
  return useQuery({
    queryKey: ['withdrawalReasons'],
    queryFn: fetchWithdrawalReasons,
    staleTime: 10 * 60 * 1000,
    gcTime: 30 * 60 * 1000,
  });
};