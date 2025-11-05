export const adminRecruitmentsQueryKey = (
  queryParams: Record<string, string | number>
) => ['admin:recruitments', queryParams] as const
