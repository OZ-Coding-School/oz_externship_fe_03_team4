import {BarChart,Bar,XAxis,YAxis,CartesianGrid,ResponsiveContainer,Tooltip,type TooltipContentProps,} from 'recharts';
import { Select } from '../../components/FormUI/Select';
import { useEffect, useState } from 'react'; //api나오면 삭제
//api 나오면 주석 삭제 import { useMonthlyWithdrawalTrends } from '../../hooks/chart/fetchWithdrawReasonstick';

// API 나오면 삭제
const MOCK_DATA = {
  '서비스 불만족': [
    { month: '1월', count: 1 },
    { month: '2월', count: 0.8 },
    { month: '3월', count: 2 },
    { month: '4월', count: 1 },
    { month: '5월', count: 1 },
    { month: '6월', count: 0.7 },
    { month: '7월', count: 0.9 },
    { month: '8월', count: 1 },
    { month: '9월', count: 2 },
    { month: '10월', count: 1 },
    { month: '11월', count: 1 },
    { month: '12월', count: 0.8 },
  ],
  '개인정보 우려': [
    { month: '1월', count: 0.5 },
    { month: '2월', count: 1.2 },
    { month: '3월', count: 0.7 },
    { month: '4월', count: 0.9 },
    { month: '5월', count: 1.1 },
    { month: '6월', count: 0.5 },
    { month: '7월', count: 0.8 },
    { month: '8월', count: 1 },
    { month: '9월', count: 1.2 },
    { month: '10월', count: 0.9 },
    { month: '11월', count: 1.1 },
    { month: '12월', count: 0.7 },
  ],
  '사용 빈도 낮음': [
    { month: '1월', count: 0.8 },
    { month: '2월', count: 0.6 },
    { month: '3월', count: 1 },
    { month: '4월', count: 0.7 },
    { month: '5월', count: 0.9 },
    { month: '6월', count: 0.5 },
    { month: '7월', count: 0.7 },
    { month: '8월', count: 0.8 },
    { month: '9월', count: 1.1 },
    { month: '10월', count: 0.8 },
    { month: '11월', count: 0.9 },
    { month: '12월', count: 0.6 },
  ],
  '기타': [
    { month: '1월', count: 0.6 },
    { month: '2월', count: 0.5 },
    { month: '3월', count: 0.8 },
    { month: '4월', count: 0.6 },
    { month: '5월', count: 0.7 },
    { month: '6월', count: 0.4 },
    { month: '7월', count: 0.6 },
    { month: '8월', count: 0.7 },
    { month: '9월', count: 0.9 },
    { month: '10월', count: 0.6 },
    { month: '11월', count: 0.7 },
    { month: '12월', count: 0.5 },
  ],
  '경쟁 서비스 이용': [
    { month: '1월', count: 0.2 },
    { month: '2월', count: 0.3 },
    { month: '3월', count: 0.4 },
    { month: '4월', count: 0.2 },
    { month: '5월', count: 0.3 },
    { month: '6월', count: 0.2 },
    { month: '7월', count: 0.3 },
    { month: '8월', count: 0.3 },
    { month: '9월', count: 0.4 },
    { month: '10월', count: 0.3 },
    { month: '11월', count: 0.3 },
    { month: '12월', count: 0.2 },
  ],
};

const REASON_LIST = ['서비스 불만족', '개인정보 우려', '사용 빈도 낮음', '기타', '경쟁 서비스 이용'];

interface WithdrawReasonstickChartProps {
  selectedReason: string;
  onReasonChange: (reason: string) => void;
  isAnimationActive: boolean;
}
// API 나오면 여기까지 삭제

const CustomTooltip = ({
  active,
  payload,
  label,
}: TooltipContentProps<string | number, string>) => {
  if (!active || !payload || !payload.length) return null;

  return (
    <div className="bg-white border border-gray-300 rounded-lg p-3 shadow-lg">
      <p className="font-semibold text-gray-900">{label}</p>
      <p className="text-yellow-600">{`탈퇴자 수: ${payload[0].value}명`}</p>
    </div>
  );
};

export default function MonthlyTrendChart({
  selectedReason,
  onReasonChange,
  isAnimationActive,
}: WithdrawReasonstickChartProps) {
  const [monthlyData, setMonthlyData] = useState<Record<string, Array<{ month: string; count: number }>>>({});
  const [reasons, setReasons] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // API 연동하면 주석 삭제
  // const { data: responseData, isLoading, error: queryError } = useMonthlyWithdrawalTrends();
  
  // if (isLoading) {
  //   return (
  //     <div className="bg-white rounded-2xl p-6 shadow-sm">
  //       <h3 className="text-base font-semibold">탈퇴 사유별 월별 추세</h3>
  //       <div className="h-[300px] flex items-center justify-center">
  //         <p className="text-gray-500">로딩 중...</p>
  //       </div>
  //     </div>
  //   );
  // }

  // if (queryError) {
  //   return (
  //     <div className="bg-white rounded-2xl p-6 shadow-sm">
  //       <h3 className="text-base font-semibold">탈퇴 사유별 월별 추세</h3>
  //       <div className="h-[300px] flex items-center justify-center">
  //         <p className="text-red-500">
  //           {queryError instanceof Error ? queryError.message : '데이터를 불러오는데 실패했습니다.'}
  //         </p>
  //       </div>
  //     </div>
  //   );
  // }

  // if (!responseData) {
  //   return (
  //     <div className="bg-white rounded-2xl p-6 shadow-sm">
  //       <h3 className="text-base font-semibold">탈퇴 사유별 월별 추세</h3>
  //       <div className="h-[300px] flex items-center justify-center">
  //         <p className="text-gray-500">데이터가 없습니다.</p>
  //       </div>
  //     </div>
  //   );
  // }

  // setMonthlyData(responseData.monthly_data);
  // setReasons(responseData.reasons);
  // API 연동하면 주석 삭제

  useEffect(() => {
    const fetchMonthlyData = async () => {
      setLoading(true);
      setError(null);

      try {
        // API 연동되면 실제 API 응답으로 교체
        setMonthlyData(MOCK_DATA);
        setReasons(REASON_LIST);
      } catch (err) {
        setError(err instanceof Error ? err.message : '데이터를 불러오는데 실패했습니다.');
      } finally {
        setLoading(false);
      }
    };

    fetchMonthlyData();
  }, []);

  if (loading) {
    return (
      <div className="bg-white rounded-2xl p-6 shadow-sm">
        <h3 className="text-base font-semibold">탈퇴 사유별 월별 추세</h3>
        <div className="h-[300px] flex items-center justify-center">
          <p className="text-gray-500">로딩 중...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-white rounded-2xl p-6 shadow-sm">
        <h3 className="text-base font-semibold">탈퇴 사유별 월별 추세</h3>
        <div className="h-[300px] flex items-center justify-center">
          <p className="text-red-500">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl p-6 shadow-sm">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-base font-semibold">탈퇴 사유별 월별 추세</h3>
        <div className="w-40">
          <Select value={selectedReason} onChange={(e) => onReasonChange(e.target.value)}>
            {reasons.map((reason) => (
              <option key={reason} value={reason}>
                {reason}
              </option>
            ))}
          </Select>
        </div>
      </div>

      <div className="h-[300px]">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={monthlyData[selectedReason] || []}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip content={CustomTooltip} />
            <Bar
              dataKey="count"
              maxBarSize={40}
              isAnimationActive={isAnimationActive}
              fill="#FDB022"
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}