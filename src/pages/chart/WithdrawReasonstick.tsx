import {BarChart,Bar,XAxis,YAxis,CartesianGrid,ResponsiveContainer,Tooltip,type TooltipContentProps,} from 'recharts';
import { Select } from '../../components/FormUI/Select';

const REASON_DATA = [
  { name: '서비스 불만족', value: 35, color: '#0088FE' },
  { name: '개인정보 우려', value: 25, color: '#00C49F' },
  { name: '사용 빈도 낮음', value: 20, color: '#FFBB28' },
  { name: '기타', value: 15, color: '#FF8042' },
  { name: '경쟁 서비스 이용', value: 5, color: '#8884D8' },
];

const MONTHLY_DATA_BY_REASON: Record<string, Array<{ month: string; count: number }>> = {
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

interface WithdrawReasonstickChartProps {
  selectedReason: string;
  onReasonChange: (reason: string) => void;
  isAnimationActive: boolean;
}

export default function MonthlyTrendChart({
  selectedReason,
  onReasonChange,
  isAnimationActive,
}: WithdrawReasonstickChartProps) {
  return (
    <div className="bg-white rounded-2xl p-6 shadow-sm">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-base font-semibold">탈퇴 사유별 월별 추세</h3>
        <div className="w-40">
          <Select value={selectedReason} onChange={(e) => onReasonChange(e.target.value)}>
            {REASON_DATA.map((reason) => (
              <option key={reason.name} value={reason.name}>
                {reason.name}
              </option>
            ))}
          </Select>
        </div>
      </div>

      <div className="h-[300px]">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={MONTHLY_DATA_BY_REASON[selectedReason]}>
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