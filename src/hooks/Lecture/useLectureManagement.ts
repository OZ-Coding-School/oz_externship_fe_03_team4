import { useEffect } from 'react'
import { useLectureSearch } from './useLectureSearch'
import { useLecturePagination } from './useLecturePagination'
import { useLectureModal } from './useLectureModal'
import { useLectureData } from './useLectureData'
import type { Lecture } from '../../types/lectureManagement/types'

const PAGE_SIZE = 10

export const useLectureManagement = () => {
  // 검색 로직
  const { searchKeyword, debouncedSearch, handleSearchChange, clearSearch } =
    useLectureSearch()

  // 페이지네이션 로직
  const {
    currentPage,
    handlePageChange,
    resetToFirstPage,
    calculateTotalPages,
  } = useLecturePagination({ pageSize: PAGE_SIZE })

  // 모달 로직
  const { isModalOpen, selectedLecture, openModal, closeModal } =
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

  // 검색어 변경 시 첫 페이지로
  useEffect(() => {
    resetToFirstPage()
  }, [debouncedSearch, resetToFirstPage])

  // 통합된 핸들러 함수들
  const handleSearch = (keyword: string) => {
    handleSearchChange(keyword)
  }

  const handleLectureClick = (lecture: Lecture) => {
    openModal(lecture)
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
    selectedLecture,
    handleLectureClick,
    closeModal,

    // 상수
    pageSize: PAGE_SIZE,
  }
}
