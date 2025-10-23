import {
  useQuery,
  keepPreviousData,
  type UseQueryResult,
} from '@tanstack/react-query'
import { adminLectureKeys } from './queryKeys'
import { buildQueryParams } from './buildQueryParams'
import { fetchLectures, type FetchLecturesReturn } from './fetchLecture'
import type { LecturesParams } from './types.local'

export const useLecturesQuery = (
  lecturesParams: LecturesParams
): UseQueryResult<FetchLecturesReturn, Error> => {
  const queryParams = buildQueryParams(lecturesParams)
  const fetchAdminLectureList = () => fetchLectures(queryParams)

  return useQuery<
    FetchLecturesReturn,
    Error,
    FetchLecturesReturn,
    ReturnType<typeof adminLectureKeys>
  >({
    queryKey: adminLectureKeys(queryParams),
    queryFn: fetchAdminLectureList,
    placeholderData: keepPreviousData,
    staleTime: 30_000,
  })
}

export type { LecturesParams } from './types.local'
