import api from '../../lib/axios'
import {
  mapStudyGroupDTO,
  type StudyGroup,
  type StudyGroupListResponse,
} from '../../types/studyGroup/types'
import { buildQueryParams } from './buildQueryParams'
import type { StudyGroupsParams } from './types.local'

export type FetchStudyGroupsParams = Record<string, string | number>

export type FetchStudyGroupsReturn = {
  items: StudyGroup[]
  totalCount: number
  pageSize: number
  offset: number
  hasNext: boolean
  hasPrevious: boolean
}

export const fetchStudyGroups = async (
  params: StudyGroupsParams
): Promise<FetchStudyGroupsReturn> => {
  const queryParams = buildQueryParams(params)
  const response = await api.get<StudyGroupListResponse>(
    '/v1/studies/admin/groups/',
    {
      params: queryParams,
    }
  )

  const data = response.data
  // 상세모달때 detail 관련 부분 추가 필요!
  return {
    items: data.results.map(mapStudyGroupDTO),
    totalCount: data.count ?? 0,
    pageSize: Number(queryParams.limit),
    offset: Number(queryParams.offset),
    hasNext: !!data.next,
    hasPrevious: !!data.previous,
  }
}
