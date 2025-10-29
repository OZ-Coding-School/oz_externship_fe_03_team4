export type SignupItemDTO = {
  period: string
  count: number
}

export type SignupStatisticsDTO = {
  detail: string
  data: {
    interval: string
    from: string
    to: string
    total_signups: number
    items: SignupItemDTO[]
  }
}

export type SignupChartData = {
  month: string
  count: number
}

export type SignupStatistics = {
  interval: 'month' | 'year'
  fromDate: string
  toDate: string
  totalSignups: number
  chartData: SignupChartData[]
}

export const mapDtoToSignupStatistics = (dto: SignupStatisticsDTO): SignupStatistics => ({
  interval: dto.data.interval as 'month' | 'year',
  fromDate: dto.data.from,
  toDate: dto.data.to,
  totalSignups: dto.data.total_signups,
  chartData: dto.data.items.map(item => ({
    month: item.period,
    count: item.count,
  })),
})