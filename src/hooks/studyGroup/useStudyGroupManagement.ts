import { useState, useMemo } from 'react'
import { useStudyGroupFilter } from './useStudyGroupFilter'
import { useStudyGroups } from './useStudyGroupQuery'
import {
  STUDY_GROUP_STATUS_REVERSE_MAP,
  type StudyGroup,
} from '../../types/studyGroup/types'
import { useStudyGroupModal } from './useStudyGroupModal'

const PAGE_SIZE = 10

export const useStudyGroupManagement = () => {
  const [searchKeyword, setSearchKeyword] = useState('')
  const [currentPage, setCurrentPage] = useState(1)
  const [sortKey, setSortKey] = useState('-created_at')

  // 필터 hook
  const {
    selectedStatus,
    accordionValue,
    selectedStatusLabel,
    handleStatusChange,
    setAccordionValue,
  } = useStudyGroupFilter()

  // API 호출
  const { data, isLoading, isFetching } = useStudyGroups({
    searchText: searchKeyword,
    status:
      selectedStatus === 'ALL'
        ? undefined
        : STUDY_GROUP_STATUS_REVERSE_MAP[selectedStatus],
    sortKey: sortKey,
    pageSize: PAGE_SIZE,
    pageNumber: currentPage,
  })

  // 모달
  const {
    isModalOpen,
    selectedStudyGroup,
    isLoadingDetail,
    openModal,
    closeModal,
  } = useStudyGroupModal()

  // 계산된 값
  const paginatedStudyGroups = useMemo(() => {
    return data?.items ?? []
  }, [data])

  const totalCount = data?.totalCount ?? 0
  const totalPages = Math.ceil(totalCount / PAGE_SIZE)
  const isEmpty = paginatedStudyGroups.length === 0 && !isLoading

  const resetToFirstPage = () => {
    setCurrentPage(1)
  }

  // 핸들러
  const handleSearch = (keyword: string) => {
    setSearchKeyword(keyword)
    setCurrentPage(1)
    resetToFirstPage()
  }

  const handleFilterChange = (status: typeof selectedStatus) => {
    handleStatusChange(status)
    setCurrentPage(1)
  }

  const handleSort = (key: string) => {
    setSortKey(key)
    setCurrentPage(1)
  }

  const handlePageChange = (page: number) => {
    setCurrentPage(page)
  }

  const handleStudyGroupClick = (studyGroup: StudyGroup) => {
    openModal(studyGroup)
  }

  return {
    // 검색
    searchKeyword,
    handleSearch,

    // 필터
    selectedStatus,
    accordionValue,
    selectedStatusLabel,
    handleFilterChange,
    setAccordionValue,

    // 정렬
    sortKey,
    handleSort,

    // 페이지네이션
    currentPage,
    totalPages,
    showPagination: totalPages > 1,
    handlePageChange,

    // 데이터
    paginatedStudyGroups,
    totalCount,
    isEmpty,
    isLoading: isLoading || isFetching,

    // 모달
    isModalOpen,
    selectedStudyGroup,
    isLoadingDetail,
    handleStudyGroupClick,
    closeModal,
  }
}
