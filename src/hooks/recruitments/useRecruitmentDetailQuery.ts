import { useQuery } from '@tanstack/react-query'
import api from '../../lib/axios'
import {
  mapRecruitmentDetailDTO,
  type Recruitment,
  type RecruitmentDetailDTO,
  type RecruitmentDetail,
} from '../../types/recruitments'

const DETAIL_STALE_TIME_MILLISECONDS = 30 * 1000

const createRecruitmentDetailQueryKey = (recruitmentId: number) =>
  ['admin', 'recruitments', 'detail', recruitmentId] as const

export const useRecruitmentDetailQuery = (recruitment: Recruitment | null) => {
  return useQuery<RecruitmentDetail, Error>({
    enabled: !!recruitment,
    queryKey: recruitment
      ? createRecruitmentDetailQueryKey(recruitment.id)
      : ['admin', 'recruitments', 'detail', 'idle'],
    staleTime: DETAIL_STALE_TIME_MILLISECONDS,
    queryFn: async () => {
      if (!recruitment?.uuid) {
        throw new Error('선택된 공고가 없습니다.')
      }
      const { data } = await api.get<RecruitmentDetailDTO>(
        `/v1/admin/recruitments/${recruitment.uuid}`
      )
      return mapRecruitmentDetailDTO(data)
    },
  })
}
