export type SignupItemDTO = {
  period: string
  count: number
}

export type SignupStatisticsDTO = {
  detail: string
  data: {
    interval: string
    from_date: string
    to_date: string
    total_signups: number
    items: SignupItemDTO[]
  }
}

export type SignupChartData = {
  period: string
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
  fromDate: dto.data.from_date,
  toDate: dto.data.to_date,
  totalSignups: dto.data.total_signups,
  chartData: dto.data.items.map(item => ({
    period: item.period,
    count: item.count,
  })),
})