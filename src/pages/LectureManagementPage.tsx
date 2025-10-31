import { useMemo, useState } from 'react'
import { useSearchParams } from 'react-router'
import type { Lecture } from '../types/lectureManagement/types'
import { mockLectures } from '../components/Lecture/mockLecture'
import { SearchInput } from '../components/search/SearchInput'
import { LectureTable } from '../components/Lecture/LectureTable'
import { LectureModal } from '../components/Lecture/LectureModal'
import { Pagination } from '../components/pagination/Pagination'
import { useDebouncedValue } from '../hooks/useDebouncedValue'

const PAGE_SIZE = 10
const USE_MOCK_DATA = true // 환경변수

export const LectureManagementPage = () => {
  const [searchParams] = useSearchParams()
  const initialPageNumber = Number(searchParams.get('page') ?? '1')

  const [searchKeyword, setSearchKeyword] = useState<string>('')
  const [currentPage, setCurrentPage] = useState<number>(initialPageNumber)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [selectedLecture, setSelectedLecture] = useState<Lecture | null>(null)

  const debouncedSearch = useDebouncedValue(searchKeyword, 500)

  const lectures = useMemo(() => {
    //  API 호출하는 부분
    return mockLectures
  }, [])

  const filteredLectures = useMemo((): Lecture[] => {
    if (!debouncedSearch.trim()) return lectures

    const lowerSearch = debouncedSearch.trim().toLowerCase()
    return lectures.filter(
      (lecture) =>
        lecture.title.toLowerCase().includes(lowerSearch) ||
        lecture.instructor.toLowerCase().includes(lowerSearch)
    )
  }, [lectures, debouncedSearch])

  const totalPages = Math.max(1, Math.ceil(filteredLectures.length / PAGE_SIZE))

  // 페이지네이션
  const paginatedLectures = useMemo(() => {
    const startIndex = (currentPage - 1) * PAGE_SIZE
    const endIndex = startIndex + PAGE_SIZE
    return filteredLectures.slice(startIndex, endIndex)
  }, [filteredLectures, currentPage])

  const handleLectureClick = (lecture: Lecture) => {
    const lectureDetail: Lecture = {
      ...lecture,
      duration: lecture.duration || 7200,
      urlLink:
        lecture.urlLink ||
        `https://www.${lecture.platform.toLowerCase()}.com/course/${lecture.uuid}`,
    }

    setSelectedLecture(lectureDetail)
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
            }}
            clearable
          />
        </div>

        {/* 결과 개수 표시 */}
        <div className="text-sm text-gray-600">
          총{' '}
          <span className="font-semibold text-gray-900">
            {filteredLectures.length}
          </span>
          개의 강의
        </div>
      </div>

      {/* 테이블 */}
      {paginatedLectures.length > 0 ? (
        <>
          <LectureTable
            lectures={paginatedLectures}
            onLectureClick={handleLectureClick}
          />

          {/* 페이지네이션 */}
          {totalPages > 1 && (
            <div className="mt-6 flex justify-center">
              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={setCurrentPage}
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
      )}

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
