import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Legend, ResponsiveContainer, Tooltip, type TooltipContentProps } from 'recharts';

const monthlyData = [
  { month: '1월', count: 2 },
  { month: '2월', count: 1 },
  { month: '3월', count: 3 },
  { month: '4월', count: 4 },
  { month: '5월', count: 2 },
  { month: '6월', count: 1 },
  { month: '7월', count: 3 },
  { month: '8월', count: 2 },
  { month: '9월', count: 4 },
  { month: '10월', count: 3 },
  { month: '11월', count: 1 },
  { month: '12월', count: 2 },
];

const yearlyData = [
  { month: '2021년', count: 17 },
  { month: '2022년', count: 11 },
  { month: '2023년', count: 20 },
  { month: '2024년', count: 13 },
  { month: '2025년', count: 28 },
];

interface WithdrawtrendProps {
  isAnimationActive?: boolean;
  period: 'monthly' | 'yearly';
}

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
}: WithdrawtrendProps) => {
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