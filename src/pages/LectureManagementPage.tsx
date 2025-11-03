import { useState } from 'react'
import { useSearchParams } from 'react-router'
import type { Lecture } from '../types/lectureManagement/types'
import { SearchInput } from '../components/search/SearchInput'
import { LectureTable } from '../components/Lecture/LectureTable'
import { LectureModal } from '../components/Lecture/LectureModal'
import { Pagination } from '../components/pagination/Pagination'
import { useDebouncedValue } from '../hooks/useDebouncedValue'
import { useLecturesQuery } from '../hooks/lecture/useLecturesQuery'

const PAGE_SIZE = 10

export const LectureManagementPage = () => {
  const [searchParams, setSearchParams] = useSearchParams()
  const initialPageNumber = Number(searchParams.get('page') ?? '1')

  const [searchKeyword, setSearchKeyword] = useState<string>('')
  const [currentPage, setCurrentPage] = useState<number>(initialPageNumber)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [selectedLecture, setSelectedLecture] = useState<Lecture | null>(null)

  const debouncedSearch = useDebouncedValue(searchKeyword, 500)

  // React Query로 API 호출
  const { data, isLoading, isError, error } = useLecturesQuery({
    searchText: debouncedSearch,
    pageNumber: currentPage,
    pageSize: PAGE_SIZE,
  })

  // fetchLectures는 { items, totalCount } 형태로 반환
  const lectures = data?.items ?? []
  const totalCount = data?.totalCount ?? 0
  const totalPages = Math.max(1, Math.ceil(totalCount / PAGE_SIZE))

  const handlePageChange = (page: number) => {
    setCurrentPage(page)
    setSearchParams({ page: page.toString() })
  }

  const handleLectureClick = (lecture: Lecture) => {
    setSelectedLecture(lecture)
    setIsModalOpen(true)
  }

  const handleCloseModal = () => {
    setIsModalOpen(false)
    setSelectedLecture(null)
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <h1 className="mb-6 text-2xl font-bold text-gray-900">강의 관리</h1>

      <div className="mb-6 space-y-4 rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
        {/* 검색 입력 */}
        <div>
          <label className="mb-2 block text-sm font-medium text-gray-700">
            검색
          </label>
          <SearchInput
            placeholder="강의명, 강사명 검색..."
            value={searchKeyword}
            onChangeText={(nextSearchKeyword) => {
              setSearchKeyword(nextSearchKeyword)
              setCurrentPage(1)
              setSearchParams({ page: '1' })
            }}
            clearable
          />
        </div>

        {/* 결과 개수 표시 */}
        {!isLoading && (
          <div className="text-sm text-gray-600">
            총 <span className="font-semibold text-gray-900">{totalCount}</span>
            개의 강의
          </div>
        )}
      </div>

      {/* 로딩 상태 */}
      {isLoading && (
        <div className="flex h-64 items-center justify-center rounded-lg border border-gray-200 bg-white">
          <div className="text-center">
            <p className="text-gray-500">로딩 중...</p>
          </div>
        </div>
      )}

      {/* 에러 상태 */}
      {isError && (
        <div className="flex h-64 items-center justify-center rounded-lg border border-red-200 bg-red-50">
          <div className="text-center">
            <p className="text-red-600">데이터를 불러오는데 실패했습니다.</p>
            <p className="mt-1 text-sm text-red-500">
              {error?.message || '알 수 없는 오류가 발생했습니다.'}
            </p>
          </div>
        </div>
      )}

      {/* 테이블 */}
      {!isLoading &&
        !isError &&
        (lectures.length > 0 ? (
          <>
            <LectureTable
              lectures={lectures}
              onLectureClick={handleLectureClick}
            />

            {totalPages > 1 && (
              <div className="mt-6 flex justify-center">
                <Pagination
                  currentPage={currentPage}
                  totalPages={totalPages}
                  onPageChange={handlePageChange}
                />
              </div>
            )}
          </>
        ) : (
          <div className="flex h-64 items-center justify-center rounded-lg border border-gray-200 bg-white">
            <div className="text-center">
              <p className="text-gray-500">검색 결과가 없습니다.</p>
              <p className="mt-1 text-sm text-gray-400">
                다른 검색어를 입력해보세요.
              </p>
            </div>
          </div>
        ))}

      {/* 모달 */}
      {selectedLecture && (
        <LectureModal
          open={isModalOpen}
          onClose={handleCloseModal}
          lecture={selectedLecture}
        />
      )}
    </div>
  )
}
