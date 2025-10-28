export const adminApplicationsQueryKey = (
  queryParams: Record<string, string | number>
) => ['admin:applications', queryParams] as const
