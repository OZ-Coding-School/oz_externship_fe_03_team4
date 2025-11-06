import { useEffect } from 'react'
import { useStudyGroupSearch } from './useStudyGroupSearch'
import { useStudyGroupFilter } from './useStudyGroupFilter'
import { useStudyGroupSort } from './useStudyGroupSort'
import { useStudyGroupPagination } from './useStudyGroupPagination'
import { useStudyGroupData } from './useStudyGroupData'
import { useStudyGroupModal } from './useStudyGroupModal'
import type { StudyGroup } from '../../types/studyGroup/types'

const PAGE_SIZE = 10

export const useStudyGroupManagement = () => {
  // 검색 로직
  const { searchKeyword, debouncedSearch, handleSearchChange, clearSearch } =
    useStudyGroupSearch()

  // 필터 로직
  const {
    selectedStatus,
    accordionValue,
    selectedStatusLabel,
    handleStatusChange,
    setAccordionValue,
    resetFilter,
  } = useStudyGroupFilter()

  // 데이터 조회 및 필터링
  const { filteredStudyGroups } = useStudyGroupData({
    searchText: debouncedSearch,
    selectedStatus,
  })

  // 정렬 로직
  const { sortKey, sortedStudyGroups, handleSortChange } =
    useStudyGroupSort(filteredStudyGroups)

  // 페이지네이션 로직
  const {
    currentPage,
    totalPages,
    paginatedItems: paginatedStudyGroups,
    handlePageChange,
    resetToFirstPage,
  } = useStudyGroupPagination({
    pageSize: PAGE_SIZE,
    items: sortedStudyGroups,
  })

  // 모달 로직
  const {
    isModalOpen,
    selectedStudyGroup,
    isLoadingDetail,
    openModal,
    closeModal,
  } = useStudyGroupModal()

  // 검색/필터 변경 시 첫 페이지로
  useEffect(() => {
    resetToFirstPage()
  }, [debouncedSearch, selectedStatus, resetToFirstPage])

  // 정렬 변경 시 첫 페이지로
  useEffect(() => {
    resetToFirstPage()
  }, [sortKey, resetToFirstPage])

  // 계산된 값들
  const totalCount = sortedStudyGroups.length
  const isEmpty = paginatedStudyGroups.length === 0
  const showPagination = totalPages > 1

  // 통합된 핸들러 함수들
  const handleSearch = (keyword: string) => {
    handleSearchChange(keyword)
  }

  const handleFilterChange = (status: typeof selectedStatus) => {
    handleStatusChange(status)
  }

  const handleSort = (key: string) => {
    handleSortChange(key)
  }

  const handleStudyGroupClick = (studyGroup: StudyGroup) => {
    openModal(studyGroup)
  }

  return {
    // 검색 관련
    searchKeyword,
    handleSearch,
    clearSearch,

    // 필터 관련
    selectedStatus,
    accordionValue,
    selectedStatusLabel,
    handleFilterChange,
    setAccordionValue,
    resetFilter,

    // 정렬 관련
    sortKey,
    handleSort,

    // 페이지네이션 관련
    currentPage,
    totalPages,
    showPagination,
    handlePageChange,

    // 데이터 관련
    paginatedStudyGroups,
    totalCount,
    isEmpty,

    // 모달 관련
    isModalOpen,
    selectedStudyGroup,
    isLoadingDetail,
    handleStudyGroupClick,
    closeModal,

    // 상수
    pageSize: PAGE_SIZE,
  }
}
