import {
  keepPreviousData, // 페이지 이동할때 이전 데이터를 유지해줍니닷.
  useQuery,
  type UseQueryResult,
} from '@tanstack/react-query'
import { adminRecruitmentsQueryKey } from './queryKeys'
import { buildRecruitmentsQueryParams } from './buildQueryParams'
import {
  fetchRecruitments,
  type FetchRecruitmentsReturn,
} from '../../api/fetchRecruitments'
import type { AdminRecruitmentsParams } from './types.local'

const SECOND = 1_000
const STALE_TIME_RECRUITMENTS = 30 * SECOND // 30초 동안 캐시 데이터를 사용합나디
// 공고 데이터 요청 + 캐싱 + 로딩 및 에러 상태까지 관리해주는 훅
export const useAdminRecruitmentsQuery = (
  options: AdminRecruitmentsParams
): UseQueryResult<FetchRecruitmentsReturn, Error> => {
  const requestParams = buildRecruitmentsQueryParams(options) // 서버 파라미터 변환
  const queryFn = () => fetchRecruitments(requestParams) // 실제 api호출

  return useQuery<
    FetchRecruitmentsReturn,
    Error,
    FetchRecruitmentsReturn,
    ReturnType<typeof adminRecruitmentsQueryKey>
  >({
    queryKey: adminRecruitmentsQueryKey(requestParams), // 캐싱 및 리패치 기준
    queryFn,
    placeholderData: keepPreviousData, // 페이지 변경해도 UI 깜빡임을 방지해줌
    staleTime: STALE_TIME_RECRUITMENTS, // 재요청을 최소화함.
  })
}
