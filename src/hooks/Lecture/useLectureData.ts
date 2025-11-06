import { useLecturesQuery } from './useLecturesQuery'

interface UseLectureDataProps {
  searchText: string
  pageNumber: number
  pageSize: number
}

export const useLectureData = ({
  searchText,
  pageNumber,
  pageSize,
}: UseLectureDataProps) => {
  const { data, isLoading, isError, error } = useLecturesQuery({
    searchText,
    pageNumber,
    pageSize,
  })

  const lectures = data?.items ?? []
  const totalCount = data?.totalCount ?? 0
  const isEmpty = !isLoading && lectures.length === 0
  const hasResults = lectures.length > 0

  return {
    lectures,
    totalCount,
    isEmpty,
    hasResults,
    isLoading,
    isError,
    error,
  }
}
