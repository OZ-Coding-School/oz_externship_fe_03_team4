export const adminStudyGroupQueryKey = (
  queryParams: Record<string, string | number>
) => ['admin:StudyGroup', queryParams] as const
