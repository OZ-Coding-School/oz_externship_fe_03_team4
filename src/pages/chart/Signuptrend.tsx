import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Legend, ResponsiveContainer, Tooltip, type TooltipContentProps } from 'recharts';
import { mapDtoToSignupStatistics } from '../../types/Chart/SignupChart/types';
import { useSignupStatistics } from '../../hooks/chart/fetchSignup';

interface SignupChartProps {
  period: 'monthly' | 'yearly';
}

const CustomTooltip = ({ active, payload, label }: TooltipContentProps<string | number, string>) => {
  if (!active || !payload || !payload.length) return null;
  return (
    <div className="bg-white border border-gray-300 rounded-lg p-3 shadow-lg">
      <p className="font-semibold text-gray-900">{label}</p>
      <p className="text-blue-600">{`가입자 수: ${payload[0].value}명`}</p>
    </div>
  );
};

const SignupChart = ({ period }: SignupChartProps) => {
  const interval = period === 'yearly' ? 'year' : 'month';
  const { data: responseData, isLoading, error: queryError } = useSignupStatistics(interval);
  
  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-[400px]">
        <p className="text-gray-500">로딩 중...</p>
      </div>
    );
  }

  if (queryError) {
    return (
      <div className="flex items-center justify-center h-[400px]">
        <p className="text-red-500">
          {queryError instanceof Error ? queryError.message : '데이터를 불러오는데 실패했습니다.'}
        </p>
      </div>
    );
  }

  if (!responseData) {
    return (
      <div className="flex items-center justify-center h-[400px]">
        <p className="text-gray-500">데이터가 없습니다.</p>
      </div>
    );
  }

  const statistics = mapDtoToSignupStatistics(responseData);

  return (
    <ResponsiveContainer width="100%" height={400}>
      <BarChart data={statistics.chartData} margin={{ top: 20, right: 30, left: 20, bottom: 20 }}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="period" />
        <YAxis />
        <Tooltip content={CustomTooltip} />
        <Legend />
        <Bar dataKey="count" name="회원가입 추세" maxBarSize={56} fill="#FFD700" />
      </BarChart>
    </ResponsiveContainer>
  );
};

export default SignupChart;