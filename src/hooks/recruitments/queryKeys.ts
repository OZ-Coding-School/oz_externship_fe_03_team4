export const AdminRecruitmentsQueryKey = (
  queryParams: Record<string, string | number>
) => ['admin:recruitments', queryParams] as const
