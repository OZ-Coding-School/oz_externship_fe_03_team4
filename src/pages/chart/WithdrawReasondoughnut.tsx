import { Pie, PieChart, Cell, Tooltip, Sector } from 'recharts';
import { mapDtoToWithdrawalReasonDistribution, type WithdrawalReasonDistributionDTO, type WithdrawalReasonChartData } from '../../types/Chart/WithdrawReasondoughnutChart/types';
import { useEffect, useState } from 'react';

//일단 api명세서 보고 수정
const MOCK_DATA: WithdrawalReasonDistributionDTO = {
  detail: "회원 탈퇴 사유 분포 조회에 성공하였습니다.",
  data: {
    scope: "all_time",
    total_withdrawals: 1200,
    items: [
      { reason_code: "service", reason_label: "서비스 불만족", count: 450, percentage: 37.5 },
      { reason_code: "privacy", reason_label: "개인정보 우려", count: 300, percentage: 25.0 },
      { reason_code: "low_usage", reason_label: "사용 빈도 낮음", count: 240, percentage: 20.0 },
      { reason_code: "competitor", reason_label: "경쟁 서비스 이용", count: 120, percentage: 10.0 },
      { reason_code: "other", reason_label: "기타", count: 90, percentage: 7.5 }
    ]
  }
};

interface WithdrawReasondoughnutChartProps {
  isAnimationActive: boolean;
}
//api나오면 여기까지 삭제

const REASON_COLORS: Record<string, string> = {
  '서비스 불만족': '#0088FE',
  '개인정보 우려': '#00C49F',
  '사용 빈도 낮음': '#FFBB28',
  '경쟁 서비스 이용': '#8884D8',
  '기타': '#FF8042'
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
    value,
  } = props as {
    cx?: number;
    cy?: number;
    midAngle?: number;
    innerRadius?: number;
    outerRadius?: number;
    startAngle?: number;
    endAngle?: number;
    payload: WithdrawalReasonChartData & { color: string };
    value: number;
  };

  const fill = payload.color;
  const RADIAN = Math.PI / 180;
  const sin = Math.sin(-RADIAN * (midAngle ?? 0));
  const cos = Math.cos(-RADIAN * (midAngle ?? 0));
  const sx = (cx ?? 0) + ((outerRadius ?? 0) + 12) * cos;
  const sy = (cy ?? 0) + ((outerRadius ?? 0) + 12) * sin;
  const mx = (cx ?? 0) + ((outerRadius ?? 0) + 10) * cos;
  const my = (cy ?? 0) + ((outerRadius ?? 0) + 15) * sin;
  const ex = mx + (cos >= 0 ? 1 : -1) * 30;
  const ey = my;
  const textAnchor = cos >= 0 ? 'start' : 'end';

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
      <circle cx={ex} cy={ey} r={3} fill={fill} stroke="none" />
      <text x={ex + (cos >= 0 ? 1 : -1) * 12} y={ey} textAnchor={textAnchor} fill="#333" fontSize={20}>
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
        {`${((percent ?? 0) * 100).toFixed(1)}%`}
      </text>
    </g>
  );
};

const ReasonDistributionChart = ({ isAnimationActive }: WithdrawReasondoughnutChartProps) => {
  return (
    <div className="bg-white rounded-2xl p-6 shadow-sm">
      <h3 className="text-lg font-semibold mb-4">탈퇴 사유 분포</h3>
      <div className="flex justify-center items-center gap-4">
        <div className="flex justify-center items-center">
          <PieChart
            width={600}
            height={500}
            margin={{ top: 10, right: 40, bottom: 10, left: 40 }}
          >
            <Pie
              data={REASON_DATA}
              dataKey="value"
              cx="60%" //피드백 반영
              cy="50%"
              innerRadius="40%"
              outerRadius="75%"
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

        <div className="flex flex-col justify-center" style={{ minWidth: '180px' }}>
          {REASON_DATA.map((item) => (
            <div key={item.name} className="flex items-center mb-2 text-sm">
              <div className="flex items-center flex-1">
                <div
                  className="w-3.5 h-3.5 rounded-full mr-2 flex-shrink-0"
                  style={{ backgroundColor: item.color }}
                />
                <span className="whitespace-nowrap">{item.name}</span>
              </div>
              <span className="text-neutral-500 ml-3 whitespace-nowrap">{item.value}명</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ReasonDistributionChart;