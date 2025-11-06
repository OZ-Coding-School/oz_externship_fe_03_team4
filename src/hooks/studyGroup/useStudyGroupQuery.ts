import { useQuery } from '@tanstack/react-query'
import { fetchStudyGroups } from '../../api/fetchStudyGroups'
import type { StudyGroupsParams } from './types.local'
import { buildQueryParams } from '../../utils/studyGroup/buildQueryParams'

export const studyGroupsQueryKey = (params: StudyGroupsParams) =>
  ['admin:studyGroups', buildQueryParams(params)] as const

export const useStudyGroups = (params: StudyGroupsParams) => {
  return useQuery({
    queryKey: studyGroupsQueryKey(params),
    queryFn: () => fetchStudyGroups(params),
  })
}
