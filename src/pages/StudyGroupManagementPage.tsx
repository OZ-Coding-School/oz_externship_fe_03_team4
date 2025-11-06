import { StudyGroupTable } from '../components/studyGroup/StudyGroupTable'
import { Pagination } from '../components/pagination/Pagination'
import { StudyGroupModal } from '../components/studyGroup/StudyGroupModal'
import { useStudyGroupManagement } from '../hooks/studyGroup/useStudyGroupManagement'
import { PageHeader } from '../components/PageHeader'
import { Group } from 'lucide-react'
import { SearchAndFilterSection } from '../components/studyGroup/SearchAndFilterSection'
import { EmptyState } from '../components/Lecture/LoadingState'

const StudyGroupManagementPage = () => {
  const {
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
    showPagination,
    handlePageChange,

    // 데이터
    paginatedStudyGroups,
    totalCount,
    isEmpty,

    // 모달
    isModalOpen,
    selectedStudyGroup,
    isLoadingDetail,
    handleStudyGroupClick,
    closeModal,
  } = useStudyGroupManagement()

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <PageHeader
        iconComponent={Group}
        koreanTitle="스터디 그룹 관리"
        englishSubtitle="STUDY GROUP MANAGEMENT"
      />

      <SearchAndFilterSection
        searchKeyword={searchKeyword}
        onSearchChange={handleSearch}
        selectedStatus={selectedStatus}
        accordionValue={accordionValue}
        selectedStatusLabel={selectedStatusLabel}
        onStatusChange={handleFilterChange}
        onAccordionChange={setAccordionValue}
        totalCount={totalCount}
      />

      {isEmpty ? (
        <EmptyState
          title="검색 결과가 없습니다."
          message="다른 검색어를 입력하거나 필터를 변경해보세요."
        />
      ) : (
        <>
          <StudyGroupTable
            studyGroups={paginatedStudyGroups}
            sortKey={sortKey}
            onSortChange={handleSort}
            onStudyGroupClick={handleStudyGroupClick}
          />

          {showPagination && (
            <div className="mt-6 flex justify-center">
              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={handlePageChange}
              />
            </div>
          )}
        </>
      )}

      <StudyGroupModal
        open={isModalOpen}
        onClose={closeModal}
        studyGroup={selectedStudyGroup}
        isLoading={isLoadingDetail}
      />
    </div>
  )
}

export default StudyGroupManagementPage
