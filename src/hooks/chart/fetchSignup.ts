import { useQuery } from '@tanstack/react-query';
import { fetchSignupStatistics } from '../../api/fetchchart';

export const useSignupStatistics = (interval: 'month' | 'year') => {
  return useQuery({
    queryKey: ['signupStatistics', interval],
    queryFn: () => fetchSignupStatistics(interval),
    staleTime: 5 * 60 * 1000, // 5분
    gcTime: 10 * 60 * 1000, // 10분 (formerly cacheTime)
  });
};