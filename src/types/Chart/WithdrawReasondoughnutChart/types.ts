export type WithdrawalReasonItemDTO = {
  reason_code: string
  reason_label: string
  count: number
  percentage: number
}

export type WithdrawalReasonDistributionDTO = {
  detail: string
  data: {
    scope: string
    total_withdrawals: number
    items: WithdrawalReasonItemDTO[]
  }
}

export type WithdrawalReasonChartData = {
  reason: string
  count: number
  percentage: number
}

// 화면에 표시할 때 쓰는거
export type WithdrawalReasonDistribution = {
  scope: string
  totalWithdrawals: number
  chartData: WithdrawalReasonChartData[]
}

// 서버에서 받은 데이터를 화면에서 쓰기 편한 형태로 바꿔주는 거
export const mapDtoToWithdrawalReasonDistribution = (
  dto: WithdrawalReasonDistributionDTO
): WithdrawalReasonDistribution => ({
  scope: dto.data.scope,
  totalWithdrawals: dto.data.total_withdrawals,
  chartData: dto.data.items.map(item => ({
    reason: item.reason_label,
    count: item.count,
    percentage: item.percentage,
  })),
})