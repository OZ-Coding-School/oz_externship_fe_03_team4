import api from '../lib/axios'
import {
  type Recruitment,
  type RecruitmentListResponseDTO,
  type RecruitmentDTO,
  mapRecruitmentDTO,
} from '../types/recruitments'
import type { RecruitmentRequestParams } from '../hooks/recruitments/buildQueryParams'

export type FetchRecruitmentsReturn = {
  items: Recruitment[]
  page: number
  pageSize: number
  totalCount: number
}
