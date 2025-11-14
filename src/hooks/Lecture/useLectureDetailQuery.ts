import { useQuery } from '@tanstack/react-query'
import { fetchLectureDetail } from '../../api/fetchLecture'

export const lectureDetailKeys = {
  detail: (id: number) => ['lecture', 'detail', id] as const,
  all: () => ['lecture', 'detail'] as const,
} as const

export const useLectureDetailQuery = (lectureId: number | null) => {
  return useQuery({
    queryKey:
      lectureId !== null
        ? lectureDetailKeys.detail(lectureId)
        : lectureDetailKeys.all(),
    queryFn: async () => {
      if (lectureId === null) {
        throw new Error('강의 ID가 없습니다')
      }
      return fetchLectureDetail(lectureId)
    },
    enabled: lectureId !== null,
    staleTime: 30_000,
  })
}
