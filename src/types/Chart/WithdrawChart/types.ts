export type WithdrawalItemDTO = {
  period: string
  count: number
}

export type WithdrawalStatisticsDTO = {
  detail: string
  data: {
    interval: string
    from_date: string
    to_date: string
    total_withdrawals: number
    items: WithdrawalItemDTO[]
  }
}

export type WithdrawalChartData = {
  period: string
  count: number
}

export type WithdrawalStatistics = {
  interval: 'month' | 'year'
  fromDate: string
  toDate: string
  totalWithdrawals: number
  chartData: WithdrawalChartData[]
}

export const mapDtoToWithdrawalStatistics = (dto: WithdrawalStatisticsDTO): WithdrawalStatistics => ({
  interval: dto.data.interval as 'month' | 'year',
  fromDate: dto.data.from_date,
  toDate: dto.data.to_date,
  totalWithdrawals: dto.data.total_withdrawals,
  chartData: dto.data.items.map(item => ({
    period: item.period,
    count: item.count,
  })),
})