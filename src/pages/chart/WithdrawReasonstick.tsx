import {BarChart,Bar,XAxis,YAxis,CartesianGrid,ResponsiveContainer,Tooltip,type TooltipContentProps,} from 'recharts';
import { Select } from '../../components/FormUI/Select';
import { useWithdrawalReasonTrend } from '../../hooks/chart/fetchWithdrawReasonstick';
import { mapDtoToWithdrawalReasonStatistics } from '../../types/Chart/WithdrawReasonstick/types';

interface WithdrawReasonstickChartProps {
  selectedReason: string;
  onReasonChange: (reason: string) => void;
  isAnimationActive: boolean;
}

const REASON_LABEL_TO_CODE: Record<string, string> = {
  '원하는 콘텐츠나 기능의 부족': 'LACK_OF_CONTENT',
  '관심이 사라짐': 'LACK_OF_INTEREST',
  '기타': 'OTHER',
  '서비스를 이용하기가 너무 어려움': 'TOO_DIFFICULT',
  '서비스 품질 불만': 'POOR_SERVICE_QUALITY',
  '개인정보/보안 우려': 'PRIVACY_CONCERNS',
  '더 좋은 대안을 찾음': 'FOUND_BETTER_SERVICE',
  '기술적 문제(버그 등)': 'TECHNICAL_ISSUES',
  '서비스 이용할 시간이 없음': 'NO_LONGER_NEEDED',
};

const REASON_LIST = [
  '원하는 콘텐츠나 기능의 부족',
  '관심이 사라짐',
  '기타',
  '서비스를 이용하기가 너무 어려움',
  '서비스 품질 불만',
  '개인정보/보안 우려',
  '더 좋은 대안을 찾음',
  '기술적 문제(버그 등)',
  '서비스 이용할 시간이 없음',
];

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
  const reasonCode = REASON_LABEL_TO_CODE[selectedReason] || 'OTHER';
  
  const { data: responseData, isLoading, error: queryError } = useWithdrawalReasonTrend(reasonCode);

  if (isLoading) {
    return (
      <div className="bg-white rounded-2xl p-6 shadow-sm">
        <h3 className="text-base font-semibold">탈퇴 사유별 월별 추세</h3>
        <div className="h-[300px] flex items-center justify-center">
          <p className="text-gray-500">로딩 중...</p>
        </div>
      </div>
    );
  }

  if (queryError) {
    return (
      <div className="bg-white rounded-2xl p-6 shadow-sm">
        <h3 className="text-base font-semibold">탈퇴 사유별 월별 추세</h3>
        <div className="h-[300px] flex items-center justify-center">
          <p className="text-red-500">
            {queryError instanceof Error ? queryError.message : '데이터를 불러오는데 실패했습니다.'}
          </p>
        </div>
      </div>
    );
  }

  if (!responseData) {
    return (
      <div className="bg-white rounded-2xl p-6 shadow-sm">
        <h3 className="text-base font-semibold">탈퇴 사유별 월별 추세</h3>
        <div className="h-[300px] flex items-center justify-center">
          <p className="text-gray-500">데이터가 없습니다.</p>
        </div>
      </div>
    );
  }

  const statistics = mapDtoToWithdrawalReasonStatistics(responseData);

  return (
    <div className="bg-white rounded-2xl p-6 shadow-sm">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-base font-semibold">탈퇴 사유별 월별 추세</h3>
        <div className="w-60">
          <Select value={selectedReason} onChange={(e) => onReasonChange(e.target.value)}>
            {REASON_LIST.map((reason) => (
              <option key={reason} value={reason}>
                {reason}
              </option>
            ))}
          </Select>
        </div>
      </div>

      <div className="h-[300px]">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={statistics.chartData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="period" />
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