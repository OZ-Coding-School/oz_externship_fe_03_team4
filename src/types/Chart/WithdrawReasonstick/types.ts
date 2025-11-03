export type WithdrawalReasonItemDTO = {
  period: string
  count: number
}

export type WithdrawalReasonStatisticsDTO = {
  detail: string
  data: {
    interval: string
    from: string
    to: string
    total_signups: number
    items: WithdrawalReasonItemDTO[]
  }
}

export type WithdrawalReasonChartData = {
  period: string
  count: number
}

// 화면에 표시할 때 쓰는거
export type WithdrawalReasonStatistics = {
  interval: 'month'
  fromDate: string
  toDate: string
  totalWithdrawals: number
  chartData: WithdrawalReasonChartData[]
}

// 서버에서 받은 데이터를 화면에서 쓰기 편한 형태로 바꿔주는 거
export const mapDtoToWithdrawalReasonStatistics = (dto: WithdrawalReasonStatisticsDTO): WithdrawalReasonStatistics => ({
  interval: 'month',
  fromDate: dto.data.from,
  toDate: dto.data.to,
  totalWithdrawals: dto.data.total_signups,
  chartData: dto.data.items.map(item => ({
    period: item.period,
    count: item.count,
  })),
})