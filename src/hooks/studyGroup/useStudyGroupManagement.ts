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

  // 핸들러
  const handleSearch = (keyword: string) => {
    setSearchKeyword(keyword)
    setCurrentPage(1)
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

  const handleStudyGroupClick = async (studyGroup: StudyGroup) => {
    await openModal(studyGroup)
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

// import { StudyGroupTable } from '../components/studyGroup/StudyGroupTable'
// import { Pagination } from '../components/pagination/Pagination'
// import { StudyGroupModal } from '../components/studyGroup/StudyGroupModal'
// import { useStudyGroupManagement } from '../hooks/studyGroup/useStudyGroupManagement'
// import { PageHeader } from '../components/PageHeader'
// import { ClipboardList } from 'lucide-react'
// import { SearchAndFilterSection } from '../components/studyGroup/SearchAndFilterSection'
// import { EmptyState } from '../components/Lecture/LoadingState'
// import { useStudyGroups } from '../hooks/studyGroup/useStudyGroupQuery'
// import { STUDY_GROUP_STATUS_REVERSE_MAP } from '../types/studyGroup/types'

// const StudyGroupManagementPage = () => {
//   const {
//     // 검색
//     searchKeyword,
//     handleSearch,

//     // 필터
//     selectedStatus,
//     accordionValue,
//     selectedStatusLabel,
//     handleFilterChange,
//     setAccordionValue,

//     // 정렬
//     sortKey,
//     handleSort,

//     // 페이지네이션
//     currentPage,
//     totalPages,
//     showPagination,
//     handlePageChange,

//     // 데이터
//     paginatedStudyGroups,
//     totalCount,
//     isEmpty,

//     // 모달
//     isModalOpen,
//     selectedStudyGroup,
//     isLoadingDetail,
//     handleStudyGroupClick,
//     closeModal,
//   } = useStudyGroupManagement()

//   return (
//     <div className="min-h-screen bg-gray-50 p-6">
//       <PageHeader
//         iconComponent={ClipboardList}
//         koreanTitle="스터디 그룹 관리"
//         englishSubtitle="STUDY GROUP MANAGEMENT"
//       />

//       <SearchAndFilterSection
//         searchKeyword={searchKeyword}
//         onSearchChange={handleSearch}
//         selectedStatus={selectedStatus}
//         accordionValue={accordionValue}
//         selectedStatusLabel={selectedStatusLabel}
//         onStatusChange={handleFilterChange}
//         onAccordionChange={setAccordionValue}
//         totalCount={totalCount}
//       />

//       {isEmpty ? (
//         <EmptyState
//           title="검색 결과가 없습니다."
//           message="다른 검색어를 입력하거나 필터를 변경해보세요."
//         />
//       ) : (
//         <>
//           <StudyGroupTable
//             studyGroups={paginatedStudyGroups}
//             sortKey={sortKey}
//             onSortChange={handleSort}
//             onStudyGroupClick={handleStudyGroupClick}
//           />

//           {showPagination && (
//             <div className="mt-6 flex justify-center">
//               <Pagination
//                 currentPage={currentPage}
//                 totalPages={totalPages}
//                 onPageChange={handlePageChange}
//               />
//             </div>
//           )}
//         </>
//       )}

//       <StudyGroupModal
//         open={isModalOpen}
//         onClose={closeModal}
//         studyGroup={selectedStudyGroup}
//         isLoading={isLoadingDetail}
//       />
//     </div>
//   )
// }

// export default StudyGroupManagementPage
