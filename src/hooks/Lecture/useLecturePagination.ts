import { useState, useCallback } from 'react'
import { useSearchParams } from 'react-router'

interface UseLecturePaginationProps {
  pageSize: number
}

export const useLecturePagination = ({
  pageSize,
}: UseLecturePaginationProps) => {
  const [searchParams, setSearchParams] = useSearchParams()
  const initialPage = Number(searchParams.get('page') ?? '1')
  const [currentPage, setCurrentPage] = useState(initialPage)

  const handlePageChange = useCallback(
    (page: number) => {
      setCurrentPage(page)
      setSearchParams({ page: page.toString() })
    },
    [setSearchParams]
  )

  const resetToFirstPage = useCallback(() => {
    handlePageChange(1)
  }, [handlePageChange])

  const calculateTotalPages = useCallback(
    (totalCount: number) => {
      return Math.max(1, Math.ceil(totalCount / pageSize))
    },
    [pageSize]
  )

  return {
    currentPage,
    handlePageChange,
    resetToFirstPage,
    calculateTotalPages,
  }
}
