import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Legend, ResponsiveContainer, Tooltip, type TooltipContentProps } from 'recharts';
import { mapDtoToSignupStatistics, type SignupStatisticsDTO, type SignupChartData } from '../../types/Signupchart/types';
import { useEffect, useState } from 'react';

//일단 api명세서 보고 수정해서 연도숫자가 조금 이상함
const MOCK_MONTHLY_DATA: SignupStatisticsDTO = {
  "detail": "회원가입 통계 조회에 성공하였습니다.",
  "data": {
    "interval": "month", // 집계 단위 (month, year)
    "from": "2024-11-01", // 조회 시작일
    "to": "2025-10-31", // 조회 종료일
    "total_signups": 120, // 조회 기간 내 총 회원가입 수
    "items": [
      { "period": "2024-11", "count": 9 },
      { "period": "2024-12", "count": 14 },
      { "period": "2025-01", "count": 8 },
      { "period": "2025-02", "count": 11 },
      { "period": "2025-03", "count": 13 },
      { "period": "2025-04", "count": 10 },
      { "period": "2025-05", "count": 9 },
      { "period": "2025-06", "count": 12 },
      { "period": "2025-07", "count": 7 },
      { "period": "2025-08", "count": 6 },
      { "period": "2025-09", "count": 11 },
      { "period": "2025-10", "count": 10 }
    ]
  }
}

const MOCK_YEARLY_DATA: SignupStatisticsDTO = {
  "detail": "회원가입 통계 조회에 성공하였습니다.",
  "data": {
    "interval": "year", // 집계 단위 (month, year)
    "from": "2021-01-01", // 조회 시작일
    "to": "2025-10-31", // 조회 종료일
    "total_signups": 40, // 조회 기간 내 총 회원가입 수
    "items": [
      { "period": "2021", "count": 6 },
      { "period": "2022", "count": 7 },
      { "period": "2023", "count": 8 },
      { "period": "2024", "count": 9 },
      { "period": "2025", "count": 10 },
    ]
  }
}

interface SignupChartProps {
  isAnimationActive?: boolean;
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

const SignupChart = ({ isAnimationActive = true, period }: SignupChartProps) => {
  const [data, setData] = useState<SignupChartData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchSignupData = async () => {
      setLoading(true);
      setError(null);

   try {
        // TODO: API 나오면 주석 해제
        // const interval = period === 'yearly' ? 'year' : 'month';
        // const token = localStorage.getItem('access_token');
        // const response = await fetch(
        //   `/api/v1/users/statistics/signups?interval=${interval}`,
        //   {
        //     method: 'GET',
        //     headers: {
        //       'Content-Type': 'application/json',
        //       'Authorization': `Bearer ${token}`,
        //     },
        //   }
        // );
        // if (!response.ok) {
        //   throw new Error(`API 오류: ${response.status}`);
        //}
        // const dto: SignupStatisticsDTO = await response.json();
        
        const mockDto = period === 'yearly' ? MOCK_YEARLY_DATA : MOCK_MONTHLY_DATA;
        const statistics = mapDtoToSignupStatistics(mockDto);
        setData(statistics.chartData);
      } catch (err) {
        setError(err instanceof Error ? err.message : '데이터를 불러오는데 실패했습니다.');
      } finally {
        setLoading(false);
      }
    };

    fetchSignupData();
  }, [period]);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-[400px]">
        <p className="text-gray-500">로딩 중...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center h-[400px]">
        <p className="text-red-500">{error}</p>
      </div>
    );
  }

  return (
    <ResponsiveContainer width="100%" height={400}>
      <BarChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 20 }}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="month" />
        <YAxis />
        <Tooltip content={CustomTooltip} />
        <Legend />
        <Bar dataKey="count" name="회원가입 추세" maxBarSize={56} isAnimationActive={isAnimationActive} fill="#FFD700"/> {/*피드백 반영*/}
      </BarChart>
    </ResponsiveContainer>
  );
};

export default SignupChart;