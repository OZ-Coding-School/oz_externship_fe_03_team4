import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Legend, ResponsiveContainer, Tooltip, type TooltipContentProps } from 'recharts';
import { mapDtoToWithdrawalStatistics, type WithdrawalStatisticsDTO, type WithdrawalChartData } from '../../types/Chart/WithdrawChart';
import { useEffect, useState } from 'react';

//이거도 api명세서 보고 수정해서 연도숫자가 조금 이상함
const MOCK_MONTHLY_DATA: WithdrawalStatisticsDTO = {
  detail: "탈퇴 통계 조회에 성공하였습니다.",
  data: {
    interval: "month",
    from: "2024-11-01",
    to: "2025-10-31",
    total_withdrawals: 45,
    items: [
      { period: "2024-11", count: 2 },
      { period: "2024-12", count: 3 },
      { period: "2025-01", count: 4 },
      { period: "2025-02", count: 5 },
      { period: "2025-03", count: 6 },
      { period: "2025-04", count: 3 },
      { period: "2025-05", count: 4 },
      { period: "2025-06", count: 5 },
      { period: "2025-07", count: 4 },
      { period: "2025-08", count: 3 },
      { period: "2025-09", count: 4 },
      { period: "2025-10", count: 2 }
    ],
  }
}

const MOCK_YEARLY_DATA: WithdrawalStatisticsDTO = {
  detail: "탈퇴 통계 조회에 성공하였습니다.",
  data: {
    interval: "year",
    from: "2021-01-01",
    to: "2025-10-31",
    total_withdrawals: 40,
    items: [
      { period: "2021", count: 6 },
      { period: "2022", count: 7 },
      { period: "2023", count: 8 },
      { period: "2024", count: 9 },
      { period: "2025", count: 10 },
    ]  }}

interface WithdrawtrencChartdProps {
  period: 'monthly' | 'yearly';
}
//api나오면 회원가입 추세랑 같이 삭제

const CustomTooltip = ({
  active,
  payload,
  label,
}: TooltipContentProps<string | number, string>) => {
  if (!active || !payload || !payload.length) return null;
  return (
    <div className="bg-white border border-gray-300 rounded-lg p-3 shadow-lg">
      <p className="font-semibold text-gray-900">{label}</p>
      <p className="text-blue-600">{`탈퇴자 수: ${payload[0].value}명`}</p>
    </div>
  );
};

const Withdrawtrend = ({
  isAnimationActive = true,
  period,
}: WithdrawtrencChartdProps) => {
  const data = period === 'yearly' ? yearlyData : monthlyData;

  return (
    <ResponsiveContainer width="100%" height={400}>
      <BarChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 20 }}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="month" />
        <YAxis />
        <Tooltip content={CustomTooltip} />
        <Legend />
        <Bar dataKey="count" name="회원탈퇴 추세" maxBarSize={56} isAnimationActive={isAnimationActive} fill="#ff0000ff" />
      </BarChart>
    </ResponsiveContainer>
  );
};

export default Withdrawtrend;