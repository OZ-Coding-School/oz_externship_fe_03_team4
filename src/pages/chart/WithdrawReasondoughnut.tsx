<<<<<<< HEAD
import { Pie, PieChart, Cell, Tooltip, Sector } from 'recharts';
import { mapDtoToWithdrawalReasonDistribution, type WithdrawalReasonDistributionDTO, type WithdrawalReasonChartData } from '../../types/Chart/WithdrawReasondoughnutChart/types';
import { useEffect, useState } from 'react'; //api나오면 삭제
//api 나오면 주석 삭제 import { useWithdrawalReasons } from '../../hooks/chart/fetchWithdrawReasondoughnut';

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
=======
import { Pie, PieChart, Cell, Tooltip, Sector } from 'recharts'

const REASON_DATA = [
  { name: '서비스 불만족', value: 35, color: '#0088FE' },
  { name: '개인정보 우려', value: 25, color: '#00C49F' },
  { name: '사용 빈도 낮음', value: 20, color: '#FFBB28' },
  { name: '기타', value: 15, color: '#FF8042' },
  { name: '경쟁 서비스 이용', value: 5, color: '#8884D8' },
]
>>>>>>> 29aa55d (💡 chore : pull develop(#112))

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
<<<<<<< HEAD
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
=======
    cx?: number
    cy?: number
    midAngle?: number
    innerRadius?: number
    outerRadius?: number
    startAngle?: number
    endAngle?: number
    payload: { name: string; value: number; color: string }
    percent?: number
    value: number
  }
>>>>>>> 29aa55d (💡 chore : pull develop(#112))

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
<<<<<<< HEAD
  );
};

const ReasonDistributionChart = ({ isAnimationActive }: WithdrawReasondoughnutChartProps) => {
  const [data, setData] = useState<(WithdrawalReasonChartData & { color: string })[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // api연동 하면 주석삭제 
  // const { data: responseData, isLoading, error: queryError } = useWithdrawalReasons();

  // if (isLoading) {
  //   return (
  //     <div className="bg-white rounded-2xl p-6 shadow-sm">
  //       <h3 className="text-lg font-semibold mb-4">탈퇴 사유 분포</h3>
  //       <div className="flex items-center justify-center h-[500px]">
  //         <p className="text-gray-500">로딩 중...</p>
  //       </div>
  //     </div>
  //   );
  // }

  // if (queryError) {
  //   return (
  //     <div className="bg-white rounded-2xl p-6 shadow-sm">
  //       <h3 className="text-lg font-semibold mb-4">탈퇴 사유 분포</h3>
  //       <div className="flex items-center justify-center h-[500px]">
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
  //       <h3 className="text-lg font-semibold mb-4">탈퇴 사유 분포</h3>
  //       <div className="flex items-center justify-center h-[500px]">
  //         <p className="text-gray-500">데이터가 없습니다.</p>
  //       </div>
  //     </div>
  //   );
  // }

  // const statistics = mapDtoToWithdrawalReasonDistribution(responseData);
  // const chartDataWithColors = statistics.chartData.map(item => ({
  //   ...item,
  //   color: REASON_COLORS[item.reason] || '#CCCCCC'
  // }));
  // api연동 하면 주석삭제

  useEffect(() => {
    const fetchReasonData = async () => {
      setLoading(true);
      setError(null);

      try {
        // API 연동 되면 목업을 실제 API 응답으로 교체하면 끝
        const statistics = mapDtoToWithdrawalReasonDistribution(MOCK_DATA);
        const chartDataWithColors = statistics.chartData.map(item => ({
          ...item,
          color: REASON_COLORS[item.reason] || '#CCCCCC'
        }));
        setData(chartDataWithColors);
      } catch (err) {
        setError(err instanceof Error ? err.message : '데이터를 불러오는데 실패했습니다.');
      } finally {
        setLoading(false);
      }
    };

    fetchReasonData();
  }, []);

  if (loading) {
    return (
      <div className="bg-white rounded-2xl p-6 shadow-sm">
        <h3 className="text-lg font-semibold mb-4">탈퇴 사유 분포</h3>
        <div className="flex items-center justify-center h-[500px]">
          <p className="text-gray-500">로딩 중...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-white rounded-2xl p-6 shadow-sm">
        <h3 className="text-lg font-semibold mb-4">탈퇴 사유 분포</h3>
        <div className="flex items-center justify-center h-[500px]">
          <p className="text-red-500">{error}</p>
        </div>
      </div>
    );
  }

=======
  )
}

interface WithdrawReasondoughnutChartProps {
  isAnimationActive: boolean
}

const ReasonDistributionChart = ({
  isAnimationActive,
}: WithdrawReasondoughnutChartProps) => {
>>>>>>> 29aa55d (💡 chore : pull develop(#112))
  return (
    <div className="rounded-2xl bg-white p-6 shadow-sm">
      <h3 className="mb-4 text-lg font-semibold">탈퇴 사유 분포</h3>
      <div className="flex items-center justify-center gap-4">
        <div className="flex items-center justify-center">
          <PieChart
            width={600}
            height={500}
            margin={{ top: 10, right: 40, bottom: 10, left: 40 }}
          >
            <Pie
              data={data}
              dataKey="count"
              cx="50%" //피드백 반영
              cy="50%"
              innerRadius="40%"
              outerRadius="75%"
              activeShape={renderActiveShape}
              isAnimationActive={isAnimationActive}
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
            <Tooltip content={() => null} />
          </PieChart>
        </div>

<<<<<<< HEAD
        <div className="flex flex-col justify-center" style={{ minWidth: '180px' }}>
          {data.map((item) => (
            <div key={item.reason} className="flex items-center mb-2 text-sm">
              <div className="flex items-center flex-1">
=======
        <div
          className="flex flex-col justify-center"
          style={{ minWidth: '180px' }}
        >
          {REASON_DATA.map((item) => (
            <div key={item.name} className="mb-2 flex items-center text-sm">
              <div className="flex flex-1 items-center">
>>>>>>> 29aa55d (💡 chore : pull develop(#112))
                <div
                  className="mr-2 h-3.5 w-3.5 flex-shrink-0 rounded-full"
                  style={{ backgroundColor: item.color }}
                />
                <span className="whitespace-nowrap">{item.reason}</span>
              </div>
<<<<<<< HEAD
              <span className="text-neutral-500 ml-3 whitespace-nowrap">{item.count}명</span>
=======
              <span className="ml-3 whitespace-nowrap text-neutral-500">
                {item.value}명
              </span>
>>>>>>> 29aa55d (💡 chore : pull develop(#112))
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default ReasonDistributionChart
