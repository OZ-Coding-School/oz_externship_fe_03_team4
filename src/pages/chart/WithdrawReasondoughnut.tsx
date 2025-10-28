import { Pie, PieChart, Cell, Tooltip, Sector } from 'recharts';

const REASON_DATA = [
  { name: '서비스 불만족', value: 35, color: '#0088FE' },
  { name: '개인정보 우려', value: 25, color: '#00C49F' },
  { name: '사용 빈도 낮음', value: 20, color: '#FFBB28' },
  { name: '기타', value: 15, color: '#FF8042' },
  { name: '경쟁 서비스 이용', value: 5, color: '#8884D8' },
];

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
      <text x={cx} y={cy} dy={8} textAnchor="middle" fill={fill} fontSize={12}>
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
      <text x={ex + (cos >= 0 ? 1 : -1) * 12} y={ey} textAnchor={textAnchor} fill="#333" fontSize={11}>
        {`PV ${value}`}
      </text>
      <text
        x={ex + (cos >= 0 ? 1 : -1) * 12}
        y={ey}
        dy={18}
        textAnchor={textAnchor}
        fill="#999"
        fontSize={10}
      >
        {`(Rate ${((percent ?? 0) * 100).toFixed(2)}%)`}
      </text>
    </g>
  );
};

interface WithdrawReasondoughnutChartProps {
  isAnimationActive: boolean;
}

const ReasonDistributionChart = ({ isAnimationActive }: WithdrawReasondoughnutChartProps) => {
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

export default ReasonDistributionChart;