export type WithdrawalReasonstickItemDTO = {
  period: string
  count: number
}

export type WithdrawalReasonStatisticsDTO = {
  detail: string
  data: {
    interval: string
    from_date: string
    to_date: string
    total_withdrawals: number
    items: WithdrawalReasonstickItemDTO[]
  }
}

export type WithdrawalReasonChartData = {
  period: string
  count: number
}

export type WithdrawalReasonStatistics = {
  interval: string
  fromDate: string
  toDate: string
  totalWithdrawals: number
  chartData: WithdrawalReasonChartData[]
}

export const mapDtoToWithdrawalReasonStatistics = (
  dto: WithdrawalReasonStatisticsDTO
): WithdrawalReasonStatistics => ({
  interval: dto.data.interval,
  fromDate: dto.data.from_date,
  toDate: dto.data.to_date,
  totalWithdrawals: dto.data.total_withdrawals,
  chartData: dto.data.items.map((item) => ({
    period: item.period,
    count: item.count,
  })),
})