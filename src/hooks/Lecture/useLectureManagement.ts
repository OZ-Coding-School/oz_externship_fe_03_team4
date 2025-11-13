import { useLectureSearch } from './useLectureSearch'
import { useLecturePagination } from './useLecturePagination'
import { useLectureModal } from './useLectureModal'
import { useLectureData } from './useLectureData'

const PAGE_SIZE = 10

export const useLectureManagement = () => {
  // 검색 로직
  const { searchKeyword, debouncedSearch, handleSearchChange, clearSearch } =
    useLectureSearch()

  // 페이지네이션 로직
  const {
    currentPage,
    handlePageChange,
    calculateTotalPages,
    resetToFirstPage,
  } = useLecturePagination({ pageSize: PAGE_SIZE })

  // 모달 로직
  const { isModalOpen, selectedLectureId, openModal, closeModal } =
    useLectureModal()

  // 데이터 조회
  const {
    lectures,
    totalCount,
    isEmpty,
    hasResults,
    isLoading,
    isError,
    error,
  } = useLectureData({
    searchText: debouncedSearch,
    pageNumber: currentPage,
    pageSize: PAGE_SIZE,
  })

  // 계산된 값들
  const totalPages = calculateTotalPages(totalCount)
  const showPagination = totalPages > 1

  // 통합된 핸들러 함수들
  const handleSearch = (keyword: string) => {
    handleSearchChange(keyword)
    resetToFirstPage()
  }

  const handleLectureClick = (lectureId: number) => {
    openModal(lectureId)
  }

  return {
    // 검색 관련
    searchKeyword,
    handleSearch,
    clearSearch,

    // 페이지네이션 관련
    currentPage,
    totalPages,
    showPagination,
    handlePageChange,

    // 데이터 관련
    lectures,
    totalCount,
    isEmpty,
    hasResults,
    isLoading,
    isError,
    error,

    // 모달 관련
    isModalOpen,
    selectedLectureId,
    handleLectureClick,
    closeModal,

    // 상수
    pageSize: PAGE_SIZE,
  }
}
