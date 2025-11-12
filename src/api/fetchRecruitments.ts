import api from '../lib/axios'
import {
  type Recruitment,
  type RecruitmentListResponseDTO,
  type RecruitmentDTO,
  mapRecruitmentDTO,
} from '../types/recruitments'
import type { RecruitmentRequestParams } from '../hooks/recruitments/buildQueryParams'

export type FetchRecruitmentsReturn = {
  items: Recruitment[] // 공고목록
  page: number
  pageSize: number
  totalCount: number // 전체 페이지수
}
// api호출함수
export const fetchRecruitments = async (
  params: RecruitmentRequestParams // 페이지 번호, 검색어 등등
): Promise<FetchRecruitmentsReturn> => {
  const url = '/v1/admin/recruitments'
  const { data } = await api.get<RecruitmentListResponseDTO>(url, {
    params,
    paramsSerializer: {
      indexes: null,
    },
  })
  // 서버에서 받은 results 배열을 UI 형식으로 모두 변환해요.
  const items = data.results.map(
    (dto: RecruitmentDTO) => mapRecruitmentDTO(dto) // dto -> ui 매핑
  )
  const page =
    typeof params.page === 'number' ? params.page : Number(params.page) || 1

  const pageSize =
    typeof params.page_size === 'number'
      ? params.page_size
      : Number(params.page_size) || items.length || 10
  // ui에서 바로 사용할 수 있도록 포맷 통일해서 반환하기.
  return {
    items,
    page,
    pageSize,
    totalCount: data.count,
  }
}
