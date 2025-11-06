import { useMemo, useState } from 'react'
import { useSearchParams } from 'react-router'
import { Pagination } from '../components/pagination/Pagination'
import { ApplicationFilterSection } from '../components/application/filter/ApplicationFilterSection'
import { ApplicationTableSection } from '../components/application/table/ApplicationTableSection'
import {
  type Application,
  type AdminSortKey,
  type StatusFilter,
  // type ApplicationDetail,
  // apiStatusToUi,
} from '../types/applications'
import { useDebouncedValue } from '../hooks/useDebouncedValue'
import { ApplicationPageModal } from '../components/application/modal/ApplicationPageModal'
import { buildDetailSkeleton } from '../utils/applications.adapters'
import { useApplicationsQuery } from '../hooks/applications/useApplicationsQuery'
import { PageHeader } from '../components/PageHeader'
import { ClipboardList } from 'lucide-react'
import {
  EmptyState,
  ErrorState,
  LoadingState,
} from '../components/Lecture/LoadingState'

const PAGE_SIZE = 10
const StudyApplicationPage = () => {
  const [searchParams] = useSearchParams()
  const initialPageNumber = Number(searchParams.get('page') ?? '1')

  const [searchText, setSearchText] = useState<string>('')
  const [statusFilter, setStatusFilter] = useState<StatusFilter>('전체')
  const [sortKey, setSortKey] = useState<AdminSortKey>('-created_at')
  const [currentPage, setCurrentPage] = useState<number>(initialPageNumber)
  const debouncedSearchText = useDebouncedValue(searchText, 500)
  const [selectedRow, setSelectedRow] = useState<Application | null>(null)

  const { data, isLoading, isError } = useApplicationsQuery({
    searchText: debouncedSearchText,
    statusFilter,
    pageNumber: currentPage,
    pageSize: PAGE_SIZE,
    sortKey,
  })

  // 필터링 & 정렬 : 의존값이 변할 때만 계산되어 성능 낭비 줄이려고 useMemo사용
  const filteredApplications = useMemo((): Application[] => {
    let filteredList = data?.items ?? []
    if (statusFilter !== '전체') {
      // 전체가 아닌 경우
      filteredList = filteredList.filter(
        (application) => application.status === statusFilter
      )
    }
    // 공고명, 닉네임, 이메일에 검색어 포함이면 결과 출력
    if (debouncedSearchText.trim()) {
      const lowerCaseSearchText = debouncedSearchText.trim().toLowerCase()
      filteredList = filteredList.filter(
        (application) =>
          application.postingTitle
            .toLowerCase()
            .includes(lowerCaseSearchText) ||
          application.applicant.name
            .toLowerCase()
            .includes(lowerCaseSearchText) ||
          application.applicant.email
            .toLowerCase()
            .includes(lowerCaseSearchText)
      )
    }
    // 정렬 부분 : 생성, 수정을 지원하며, 날짜와 문자열을 Date.Parse()로 변환한 뒤 정렬합니당.
    const isDescending = sortKey.startsWith('-')
    const sortTargetKey = (isDescending ? sortKey.slice(1) : sortKey) as
      | 'appliedAt'
      | 'updatedAt'

    filteredList = [...filteredList].sort((firstItem, secondItem) => {
      const firstValue =
        sortTargetKey === 'appliedAt'
          ? Date.parse(firstItem.appliedAt)
          : Date.parse(firstItem.updatedAt)

      const secondValue =
        sortTargetKey === 'appliedAt'
          ? Date.parse(secondItem.appliedAt)
          : Date.parse(secondItem.updatedAt)

      return isDescending ? secondValue - firstValue : firstValue - secondValue
    })
    return filteredList
  }, [data?.items, debouncedSearchText, statusFilter, sortKey])

  const isEmpty =
    !isLoading && !isError && (filteredApplications?.length ?? 0) === 0

  const totalPages = Math.max(
    1,
    Math.ceil((data?.totalCount ?? filteredApplications.length) / PAGE_SIZE)
  )

  const paginatedApplications = filteredApplications

  return (
    <div className="space-y-4 p-6">
      {isLoading && <LoadingState message="데이터 불러오는 중..." />}
      {isError && (
        <ErrorState
          title="불러오기에 실패했습니다."
          message="잠시 후 다시 시도해 주세요."
        />
      )}
      <PageHeader
        iconComponent={ClipboardList}
        koreanTitle="지원내역 관리"
        englishSubtitle="APPLICATION MANAGEMENT"
      />
      <ApplicationFilterSection
        searchText={searchText}
        setSearchText={(nextSearchText) => {
          setSearchText(nextSearchText)
        }}
        statusFilter={statusFilter}
        setStatusFilter={(nextStatusFilter) => {
          setStatusFilter(nextStatusFilter)
          setCurrentPage(1)
        }}
        sortKey={sortKey}
        setSortKey={(nextSortKey) => {
          setSortKey(nextSortKey)
          setCurrentPage(1)
        }}
      />
      {isEmpty ? (
        <EmptyState
          title="표시할 결과가 없습니다."
          message="검색어/필터를 조정해 보세요."
        />
      ) : (
        <>
          <ApplicationTableSection
            data={paginatedApplications}
            onRowClick={(row) => setSelectedRow(row)}
          />
          {/* 1페이지 이상일 경우에만 페이지네이션 렌더링 */}
          {totalPages > 1 && (
            <div className="flex justify-center">
              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={setCurrentPage}
              />
            </div>
          )}
        </>
      )}
      {selectedRow && (
        <ApplicationPageModal
          open
          onClose={() => setSelectedRow(null)}
          detail={buildDetailSkeleton(selectedRow)}
        />
      )}
    </div>
  )
}

export default StudyApplicationPage
