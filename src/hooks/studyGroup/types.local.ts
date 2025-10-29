import type { StudyGroupStatus } from '../../types/studyGroup/types'

export type StudyGroupsParams = {
  pageSize?: number
  pageNumber?: number
  sortKey?: string
  searchText?: string
  status?: StudyGroupStatus
}
