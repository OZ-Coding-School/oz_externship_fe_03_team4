import { Pie, PieChart, Cell, Tooltip, Sector, ResponsiveContainer } from 'recharts'
import {
  mapDtoToWithdrawalReasonDistribution,
  type WithdrawalReasonChartData,
} from '../../types/Chart/WithdrawReasondoughnutChart/types'
import { useWithdrawalReasons } from '../../hooks/chart/fetchWithdrawReasondoughnut';

interface WithdrawReasondoughnutChartProps {
  isAnimationActive: boolean
}

const REASON_COLORS: Record<string, string> = {
  '원하는 콘텐츠나 기능의 부족': '#ff0000ff',
  '관심이 사라짐': '#ff5e00ff',
  '서비스를 이용하기가 너무 어려움': '#08f500ff',
  '서비스 품질 불만': '#0025f8ff',
  '기타' : '#e5ff00ff',
  '개인정보/보안 우려' : '#9000adff',
  '더 좋은 대안을 찾음' : '#e100ffff',
  '기술적 문제(버그 등)' : '#ff6ac1ff',
  '서비스 이용할 시간이 없음' : '#250e0fc2'
}

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
    value,
  } = props as {
    cx?: number
    cy?: number
    midAngle?: number
    innerRadius?: number
    outerRadius?: number
    startAngle?: number
    endAngle?: number
    payload: WithdrawalReasonChartData & { color: string }
    value: number
  }

  const fill = payload.color
  const RADIAN = Math.PI / 180
  const sin = Math.sin(-RADIAN * (midAngle ?? 0))
  const cos = Math.cos(-RADIAN * (midAngle ?? 0))
  const sx = (cx ?? 0) + ((outerRadius ?? 0) + 12) * cos
  const sy = (cy ?? 0) + ((outerRadius ?? 0) + 12) * sin
  const mx = (cx ?? 0) + ((outerRadius ?? 0) + 10) * cos
  const my = (cy ?? 0) + ((outerRadius ?? 0) + 15) * sin
  const ex = mx + (cos >= 0 ? 1 : -1) * 30
  const ey = my
  const textAnchor = cos >= 0 ? 'start' : 'end'

  return (
    <g>
      <text
        x={cx}
        y={cy}
        dy={8}
        textAnchor="middle"
        fill={fill}
        fontSize={20}
        style={{ fontWeight: 600 }}
      >
        {payload.reason}
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
      <path
        d={`M${sx},${sy}L${mx},${my}L${ex},${ey}`}
        stroke={fill}
        fill="none"
      />
      <circle cx={ex} cy={ey} r={3} fill={fill} stroke="none" />
      <text
        x={ex + (cos >= 0 ? 1 : -1) * 12}
        y={ey}
        textAnchor={textAnchor}
        fill="#333"
        fontSize={20}
      >
        {`${value}명`}
      </text>
      <text
        x={ex + (cos >= 0 ? 1 : -1) * 12}
        y={ey}
        dy={18}
        textAnchor={textAnchor}
        fill="#888"
        fontSize={15}
      >
        {`${payload.percentage.toFixed(1)}%`}
      </text>
    </g>
  )
}

const ReasonDistributionChart = ({
  isAnimationActive,
}: WithdrawReasondoughnutChartProps) => {
  const { data: responseData, isLoading, error: queryError } = useWithdrawalReasons();

  if (isLoading) {
    return (
      <div className="bg-white rounded-2xl p-6 shadow-sm">
        <h3 className="text-lg font-semibold mb-4">탈퇴 사유 분포</h3>
        <div className="flex items-center justify-center" style={{ height: '500px' }}>
          <p className="text-gray-500">로딩 중...</p>
        </div>
      </div>
    );
  }

  if (queryError) {
    return (
      <div className="bg-white rounded-2xl p-6 shadow-sm">
        <h3 className="text-lg font-semibold mb-4">탈퇴 사유 분포</h3>
        <div className="flex items-center justify-center" style={{ height: '500px' }}>
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
        <h3 className="text-lg font-semibold mb-4">탈퇴 사유 분포</h3>
        <div className="flex items-center justify-center" style={{ height: '500px' }}>
          <p className="text-gray-500">데이터가 없습니다.</p>
        </div>
      </div>
    );
  }

  const statistics = mapDtoToWithdrawalReasonDistribution(responseData);
  
  if (!statistics.chartData || statistics.chartData.length === 0) {
    return (
      <div className="bg-white rounded-2xl p-6 shadow-sm">
        <h3 className="text-lg font-semibold mb-4">탈퇴 사유 분포</h3>
        <div className="flex items-center justify-center" style={{ height: '500px' }}>
          <p className="text-gray-500">탈퇴 사유 데이터가 없습니다.</p>
        </div>
      </div>
    );
  }

  const data = statistics.chartData.map(item => ({
    ...item,
    color: REASON_COLORS[item.reason] || '#CCCCCC'
  }));

  return (
    <div className="rounded-2xl bg-white p-6 shadow-sm">
      <h3 className="mb-4 text-lg font-semibold">탈퇴 사유 분포</h3>
      <div className="flex items-center justify-center gap-4">
        <div style={{ width: '600px', height: '500px' }}>
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={data}
                dataKey="count"
                cx="50%"
                cy="50%"
                innerRadius="40%"
                outerRadius="70%"
                activeShape={renderActiveShape}
                isAnimationActive={isAnimationActive}
              >
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip content={() => null} />
            </PieChart>
          </ResponsiveContainer>
        </div>

        <div className="flex flex-col justify-center" style={{ minWidth: '180px' }}>
          {data.map((item) => (
            <div key={item.reason} className="mb-2 flex items-center text-sm">
              <div className="flex flex-1 items-center">
                <div
                  className="mr-2 h-3.5 w-3.5 flex-shrink-0 rounded-full"
                  style={{ backgroundColor: item.color }}
                />
                <span className="whitespace-nowrap">{item.reason}</span>
              </div>
              <span className="ml-3 whitespace-nowrap text-neutral-500">
                {item.count}명
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default ReasonDistributionChart