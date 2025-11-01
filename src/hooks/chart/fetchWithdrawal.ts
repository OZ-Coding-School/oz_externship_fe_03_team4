import { useQuery } from '@tanstack/react-query';
import { fetchWithdrawalStatistics } from '../../api/fetchchart';

export const useWithdrawalStatistics = (interval: 'month' | 'year') => {
  return useQuery({
    queryKey: ['withdrawalStatistics', interval],
    queryFn: () => fetchWithdrawalStatistics(interval),
    staleTime: 5 * 60 * 1000, 
    gcTime: 10 * 60 * 1000,
  });
};