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
  period: string
  count: number
}

//화면에 표시할 때 쓰는거
export type SignupStatistics = {
  interval: 'month' | 'year'
  fromDate: string
  toDate: string
  totalSignups: number
  chartData: SignupChartData[]
}

//서버에서 받은 데이터를 화면에서 쓰기 편한 형태로 바꿔주는 거
export const mapDtoToSignupStatistics = (dto: SignupStatisticsDTO): SignupStatistics => ({
  interval: dto.data.interval as 'month' | 'year',
  fromDate: dto.data.from,
  toDate: dto.data.to,
  totalSignups: dto.data.total_signups,
  chartData: dto.data.items.map(item => ({
    period: item.period,
    count: item.count,
  })),
})

//헷갈리는거 주석넣어둠