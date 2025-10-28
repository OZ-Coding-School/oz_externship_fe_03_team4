import {Pie, PieChart, Cell, Tooltip, BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer, Sector, type TooltipContentProps,} from 'recharts';
import { useState } from 'react';
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

const renderActiveShape = (props: unknown) => {
  const {
    cx,
    cy,
    midAngle,
    innerRadius,
    outerRadius,
    startAngle,
    endAngle,
    payload,
    percent,
    value,
  } = props as {
    cx?: number;
    cy?: number;
    midAngle?: number;
    innerRadius?: number;
    outerRadius?: number;
    startAngle?: number;
    endAngle?: number;
    payload: { name: string; value: number; color: string };
    percent?: number;
    value: number;
  };

  const fill = payload.color;
  const RADIAN = Math.PI / 180;
  const sin = Math.sin(-RADIAN * (midAngle ?? 0));
  const cos = Math.cos(-RADIAN * (midAngle ?? 0));
  const sx = (cx ?? 0) + ((outerRadius ?? 0) + 10) * cos;
  const sy = (cy ?? 0) + ((outerRadius ?? 0) + 10) * sin;
  const mx = (cx ?? 0) + ((outerRadius ?? 0) + 30) * cos;
  const my = (cy ?? 0) + ((outerRadius ?? 0) + 30) * sin;
  const ex = mx + (cos >= 0 ? 1 : -1) * 22;
  const ey = my;
  const textAnchor = cos >= 0 ? 'start' : 'end';

  return (
    <g>
      <text x={cx} y={cy} dy={8} textAnchor="middle" fill={fill}>
        {payload.name}
      </text>
      <Sector
        cx={cx}
        cy={cy}
        innerRadius={innerRadius}
        outerRadius={outerRadius}
        startAngle={startAngle}
        endAngle={endAngle}
        fill={fill}
      />
      <Sector
        cx={cx}
        cy={cy}
        startAngle={startAngle}
        endAngle={endAngle}
        innerRadius={(outerRadius ?? 0) + 6}
        outerRadius={(outerRadius ?? 0) + 10}
        fill={fill}
      />
      <path d={`M${sx},${sy}L${mx},${my}L${ex},${ey}`} stroke={fill} fill="none" />
      <circle cx={ex} cy={ey} r={2} fill={fill} stroke="none" />
      <text x={ex + (cos >= 0 ? 1 : -1) * 12} y={ey} textAnchor={textAnchor} fill="#333">
        {`PV ${value}`}
      </text>
      <text
        x={ex + (cos >= 0 ? 1 : -1) * 12}
        y={ey}
        dy={18}
        textAnchor={textAnchor}
        fill="#999"
      >
        {`(Rate ${((percent ?? 0) * 100).toFixed(2)}%)`}
      </text>
    </g>
  );
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

const ReasonDistributionChart = ({ isAnimationActive }: { isAnimationActive: boolean }) => {
  return (
    <div className="bg-white rounded-2xl p-6 shadow-sm">
      <h3 className="text-base font-semibold mb-4">탈퇴 사유 분포</h3>
      <div className="flex justify-between items-center">
        <div className="w-1/2">
          <PieChart style={{ width: '100%', maxWidth: '400px', height: '280px' }}>
            <Pie
              data={REASON_DATA}
              dataKey="value"
              cx="50%"
              cy="50%"
              innerRadius="60%"
              outerRadius="80%"
              activeShape={renderActiveShape}
              isAnimationActive={isAnimationActive}
            >
              {REASON_DATA.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
            <Tooltip content={() => null} />
          </PieChart>
        </div>

        <div className="flex flex-col justify-center w-1/2 pl-4">
          {REASON_DATA.map((item) => (
            <div
              key={item.name}
              className="flex items-center justify-between mb-2 text-sm"
            >
              <div className="flex items-center">
                <div
                  className="w-3 h-3 rounded-full mr-2"
                  style={{ backgroundColor: item.color }}
                />
                <span>{item.name}</span>
              </div>
              <span className="text-neutral-500">{item.value}명</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

const MonthlyTrendChart = ({
  selectedReason,
  onReasonChange,
  isAnimationActive,
}: {
  selectedReason: string;
  onReasonChange: (reason: string) => void;
  isAnimationActive: boolean;
}) => {
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
};

interface WithdrawtrendProps {
  isAnimationActive?: boolean;
}

export default function Withdrawtrend({ isAnimationActive = true }: WithdrawtrendProps) {
  const [selectedReason, setSelectedReason] = useState('서비스 불만족');

  return (
    <div className="flex flex-col gap-6">
      <ReasonDistributionChart isAnimationActive={isAnimationActive} />
      <MonthlyTrendChart
        selectedReason={selectedReason}
        onReasonChange={setSelectedReason}
        isAnimationActive={isAnimationActive}
      />
    </div>
  );
}