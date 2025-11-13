import { useState, useMemo } from 'react'
import { useSearchParams } from 'react-router'

export const useStudyGroupPagination = <T>({
  pageSize,
  items,
}: {
  pageSize: number
  items: T[]
}) => {
  const [searchParams] = useSearchParams()
  const initialPage = Number(searchParams.get('page') ?? '1')
  const [currentPage, setCurrentPage] = useState(initialPage)

  const totalPages = Math.max(1, Math.ceil(items.length / pageSize))

  const paginatedItems = useMemo(() => {
    const startIndex = (currentPage - 1) * pageSize
    const endIndex = startIndex + pageSize
    return items.slice(startIndex, endIndex)
  }, [items, currentPage, pageSize])

  const handlePageChange = (page: number) => {
    setCurrentPage(page)
  }

  const resetToFirstPage = () => {
    setCurrentPage(1)
  }

  return {
    currentPage,
    totalPages,
    paginatedItems,
    handlePageChange,
    resetToFirstPage,
  }
}
