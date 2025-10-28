import { useQuery } from '@tanstack/react-query'
import { fetchStudyGroups } from './fetchStudyGroups'
import { buildQueryParams } from './buildQueryParams'
import type { StudyGroupsParams } from './types.local'

export const studyGroupsQueryKey = (params: StudyGroupsParams) =>
  ['admin:studyGroups', buildQueryParams(params)] as const

export const useStudyGroups = (params: StudyGroupsParams) => {
  return useQuery({
    queryKey: studyGroupsQueryKey(params),
    queryFn: () => fetchStudyGroups(params),
  })
}
