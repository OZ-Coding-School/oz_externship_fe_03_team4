import { LectureModal } from '../components/Lecture/LectureModal'
import { useLectureManagement } from '../hooks/Lecture/useLectureManagement'
import { PageHeader } from '../components/PageHeader'
import { BookOpen } from 'lucide-react'
import { SearchSection } from '../components/Lecture/SearchSection'
import { ContentArea } from '../components/Lecture/ContentArea'

const LectureManagementPage = () => {
  const {
    // 검색
    searchKeyword,
    handleSearch,

    // 페이지네이션
    currentPage,
    totalPages,
    showPagination,
    handlePageChange,

    // 데이터
    lectures,
    totalCount,
    isEmpty,
    hasResults,
    isLoading,
    isError,
    error,

    // 모달
    isModalOpen,
    selectedLecture,
    handleLectureClick,
    closeModal,

    // 상수
    pageSize,
  } = useLectureManagement()

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <PageHeader
        iconComponent={BookOpen}
        koreanTitle="강의 관리"
        englishSubtitle="LECTURE MANAGEMENT"
      />

      <SearchSection
        searchKeyword={searchKeyword}
        onSearchChange={handleSearch}
        totalCount={totalCount}
        isLoading={isLoading}
      />

      <ContentArea
        isLoading={isLoading}
        isError={isError}
        error={error}
        isEmpty={isEmpty}
        hasResults={hasResults}
        lectures={lectures}
        onLectureClick={handleLectureClick}
        currentPage={currentPage}
        pageSize={pageSize}
        showPagination={showPagination}
        totalPages={totalPages}
        onPageChange={handlePageChange}
      />

      {selectedLecture && (
        <LectureModal
          open={isModalOpen}
          onClose={closeModal}
          lecture={selectedLecture}
        />
      )}
    </div>
  )
}

export default LectureManagementPage
