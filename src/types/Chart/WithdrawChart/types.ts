export type WithdrawalItemDTO = {
  period: string
  count: number
}

export type WithdrawalStatisticsDTO = {
  detail: string
  data: {
    interval: string
    from: string
    to: string
    total_withdrawals: number
    items: WithdrawalItemDTO[]
  }
}

export type WithdrawalChartData = {
  period: string
  count: number
}

//화면에 표시할 때 쓰는거
export type WithdrawalStatistics = {
  interval: 'month' | 'year'
  fromDate: string
  toDate: string
  totalWithdrawals: number
  chartData: WithdrawalChartData[]
}

//서버에서 받은 데이터를 화면에서 쓰기 편한 형태로 바꿔주는 거
export const mapDtoToWithdrawalStatistics = (dto: WithdrawalStatisticsDTO): WithdrawalStatistics => ({
  interval: dto.data.interval as 'month' | 'year',
  fromDate: dto.data.from,
  toDate: dto.data.to,
  totalWithdrawals: dto.data.total_withdrawals,
  chartData: dto.data.items.map(item => ({
    period: item.period,
    count: item.count,
  })),
})