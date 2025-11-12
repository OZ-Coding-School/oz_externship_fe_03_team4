import { useQuery } from '@tanstack/react-query'
import { fetchRecruitmentTags } from '../../api/fetchRecruitmentTags'

export const recruitmentTagsKeys = {
  all: (params?: { search?: string; page?: number; page_size?: number }) =>
    ['recruitmentTags', params ?? {}] as const,
}

export function useRecruitmentTagsQuery(params?: {
  search?: string
  page?: number
  page_size?: number
}) {
  return useQuery({
    queryKey: recruitmentTagsKeys.all(params),
    queryFn: async () => {
      const { results, count } = await fetchRecruitmentTags(
        params ?? { page_size: 100 }
      )

      const tagNames = results.map((tagItem) => tagItem.name)
      return { tags: tagNames, totalCount: count }
    },
    staleTime: 60_000,
  })
}
