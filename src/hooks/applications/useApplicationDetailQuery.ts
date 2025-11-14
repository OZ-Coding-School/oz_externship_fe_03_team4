import { useQuery } from '@tanstack/react-query'
import api from '../../lib/axios'
import {
  mapApplicationDetailApiToUi,
  type Application,
  type ApplicationDetail,
} from '../../types/applications'

const DETAIL_STALE_TIME_MILLISECONDS = 30 * 1000
// 지원내역의 상세 정보만 관리하기에, 여기 안에 쿼리 키를 정의했어요~
const createApplicationDetailQueryKey = (applicationUuid: string) =>
  ['admin', 'applications', 'detail', applicationUuid] as const

export const useApplicationDetailQuery = (application: Application | null) => {
  return useQuery<ApplicationDetail, Error>({
    enabled: !!application?.uuid,
    queryKey: application
      ? createApplicationDetailQueryKey(application.uuid as string)
      : ['admin', 'applications', 'detail', 'idle'],
    staleTime: DETAIL_STALE_TIME_MILLISECONDS,
    queryFn: async () => {
      if (!application || !application.uuid) {
        throw new Error('선택된 항목이 없습니다.')
      }

      const response = await api.get(
        `/v1/admin/applications/${application.uuid}`
      )
      const mappedDetail = mapApplicationDetailApiToUi(
        response.data,
        application
      )
      return mappedDetail
    },
  })
}
