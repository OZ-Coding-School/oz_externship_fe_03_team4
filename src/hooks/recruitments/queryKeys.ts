import type { RecruitmentRequestParams } from './buildQueryParams'
export const adminRecruitmentsQueryKey = (
  queryParams: RecruitmentRequestParams
) => ['admin:recruitments', queryParams] as const
