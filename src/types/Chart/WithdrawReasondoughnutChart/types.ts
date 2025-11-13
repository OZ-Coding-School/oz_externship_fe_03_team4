export type WithdrawalReasondoughnutItemDTO = {
  reason_code: string
  reason_label: string
  count: number
  percentage: number
}

export type WithdrawalReasonDistributionDTO = {
  interval: string
  from_date: string
  to_date: string
  total_withdrawals: number
  items: WithdrawalReasondoughnutItemDTO[]
}

export type WithdrawalReasonChartData = {
  reason: string
  count: number
  percentage: number
}

export type WithdrawalReasonDistribution = {
  interval: string
  fromDate: string
  toDate: string
  totalWithdrawals: number
  chartData: WithdrawalReasonChartData[]
}

export const mapDtoToWithdrawalReasonDistribution = (
  dto: WithdrawalReasonDistributionDTO
): WithdrawalReasonDistribution => ({
  interval: dto.interval,
  fromDate: dto.from_date,
  toDate: dto.to_date,
  totalWithdrawals: dto.total_withdrawals,
  chartData: dto.items?.map(item => ({
    reason: item.reason_label,
    count: item.count,
    percentage: item.percentage,
  })) || [],
})