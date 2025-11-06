import type { Lecture } from '../../types/lectureManagement/types'
import { Pagination } from '../pagination/Pagination'
import { LectureTable } from './LectureTable'
import { EmptyState, ErrorState, LoadingState } from './LoadingState'

interface ContentAreaProps {
  isLoading: boolean
  isError: boolean
  error: Error | null
  isEmpty: boolean
  hasResults: boolean
  lectures: Lecture[]
  onLectureClick: (lecture: Lecture) => void
  currentPage: number
  pageSize: number
  showPagination: boolean
  totalPages: number
  onPageChange: (page: number) => void
}

export const ContentArea = ({
  isLoading,
  isError,
  error,
  isEmpty,
  // hasResults,
  lectures,
  onLectureClick,
  currentPage,
  pageSize,
  showPagination,
  totalPages,
  onPageChange,
}: ContentAreaProps) => {
  if (isLoading) {
    return <LoadingState message="로딩 중..." />
  }

  if (isError) {
    return (
      <ErrorState
        title="데이터를 불러오는데 실패했습니다."
        message={error?.message || '알 수 없는 오류가 발생했습니다.'}
      />
    )
  }

  if (isEmpty) {
    return (
      <EmptyState
        title="검색 결과가 없습니다."
        message="다른 검색어를 입력해보세요."
      />
    )
  }

  return (
    <>
      <LectureTable
        lectures={lectures}
        onLectureClick={onLectureClick}
        currentPage={currentPage}
        pageSize={pageSize}
      />

      {showPagination && (
        <div className="mt-6 flex justify-center">
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={onPageChange}
          />
        </div>
      )}
    </>
  )
}
