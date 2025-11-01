import apiClient from './client';
import type { SignupStatisticsDTO } from '../types/Chart/SignupChart/types';
import type { WithdrawalStatisticsDTO } from '../types/Chart/WithdrawChart/types';
import type { WithdrawalReasonDistributionDTO } from '../types/Chart/WithdrawReasondoughnutChart/types';

export const fetchSignupStatistics = async (interval: 'month' | 'year'): Promise<SignupStatisticsDTO> => {
  const response = await apiClient.get('/api/v1/users/statistics/signups', {
    params: { interval },
  });
  return response.data;
};

export const fetchWithdrawalStatistics = async (interval: 'month' | 'year'): Promise<WithdrawalStatisticsDTO> => {
  const response = await apiClient.get('/api/v1/users/statistics/withdrawals', {
    params: { interval },
  });
  return response.data;
};

export const fetchWithdrawalReasons = async (): Promise<WithdrawalReasonDistributionDTO> => {
  const response = await apiClient.get('/api/v1/admin/dashboard/withdrawal-reasons');
  return response.data;
};