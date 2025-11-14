import { useState } from 'react'
import { useSearchParams } from 'react-router' // 여기는 나중에 탱스택으로 바꿀예정입니닷
import { useDebouncedValue } from '../hooks/useDebouncedValue'
import { Pagination } from '../components/pagination/Pagination'
import { RecruitmentFilterSection } from '../components/recruitments/filter/RecruitmentFilterSection'
import {
  type Recruitment,
  type RecruitmentStatusApi,
  type RecruitmentDetail,
} from '../types/recruitments'
import { RecruitmentTableSection } from '../components/recruitments/table/RecruitmentTableSection'
import { Inbox, Megaphone } from 'lucide-react'
import { RecruitmentModal } from '../components/recruitments/modal/RecruitmentModal'
import { useAdminRecruitmentsQuery } from '../hooks/recruitments/useRecruitmentsQuery'
import { PageHeader } from '../components/PageHeader'
import { ErrorState, LoadingState } from '../components/Lecture/LoadingState'
import { useRecruitmentDetailQuery } from '../hooks/recruitments/useRecruitmentDetailQuery'
import { useDeleteRecruitment } from '../hooks/recruitments/useDeleteRecruitment'
import { ToastContainer } from '../components/toast/toastContainer'
import type { RecruitmentOrdering } from '../hooks/recruitments/types.local'
import { useRecruitmentTagsQuery } from '../hooks/recruitments/useRecruitmentTagsQuery'

const PAGE_SIZE = 10

const RecruitmentManagementPage = () => {
  const [searchParams] = useSearchParams()
  const initialPageNumber = Number(searchParams.get('page') ?? '1')

  const [searchText, setSearchText] = useState('')
  const debouncedSearchText = useDebouncedValue(searchText, 400)
  const [statusFilter, setStatusFilter] = useState<
    RecruitmentStatusApi | '전체'
  >('전체')
  const [selectedTags, setSelectedTags] = useState<string[]>([])
  const [currentPage, setCurrentPage] = useState<number>(initialPageNumber)
  const [ordering, setOrdering] = useState<RecruitmentOrdering>('latest')
  const { mutate: deleteRecruitment, isPending: isDeleting } =
    useDeleteRecruitment()

  const [selectedRecruitment, setSelectedRecruitment] =
    useState<Recruitment | null>(null)

  const handleSortChange = (nextOrdering: RecruitmentOrdering) => {
    setOrdering(nextOrdering)
    setCurrentPage(1)
  }

  const { data, isLoading, isError } = useAdminRecruitmentsQuery({
    searchText: debouncedSearchText,
    statusFilter: statusFilter === '전체' ? undefined : statusFilter,
    selectedTags,
    ordering,
    pageNumber: currentPage,
    pageSize: PAGE_SIZE,
  })

  const {
    data: recruitmentDetail,
    isLoading: isRecruitmentDetailLoading,
    isError: isRecruitmentDetailError,
  } = useRecruitmentDetailQuery(selectedRecruitment)

  const handleRowClick = (row: Recruitment) => {
    setSelectedRecruitment(row)
  }

  const fallbackDetail: RecruitmentDetail | null = selectedRecruitment
    ? ({
        ...selectedRecruitment,
        // 목록 응답에 이미 uuid 있으니까 그대로 사용
        uuid: selectedRecruitment.uuid,
        content: isRecruitmentDetailLoading
          ? '상세정보를 불러오는 중...'
          : isRecruitmentDetailError
            ? '공고 상세정보를 불러오지 못했어요.'
            : '',
        expectedHeadcount: 0,
        estimatedFee: 0,
        attachments: [],
        lectures: [],
        applications: [],
        studyGroup: null,
        isClosed: selectedRecruitment.isClosed,
      } as RecruitmentDetail)
    : null

  const effectiveDetail: RecruitmentDetail | null =
    recruitmentDetail ?? fallbackDetail

  const filteredRecruitments = data?.items ?? []
  const totalCount = data?.totalCount ?? 0

  const hasNoData = !isLoading && !isError && filteredRecruitments.length === 0

  const totalPages = Math.max(1, Math.ceil((data?.totalCount ?? 0) / PAGE_SIZE))

  const paginatedRecruitments = filteredRecruitments

  const { data: tagData } = useRecruitmentTagsQuery({ page_size: 100 })
  const availableTags = tagData?.tags ?? []

  const resetFilters = () => {
    setSearchText('')
    setStatusFilter('전체')
    setSelectedTags([])
    setCurrentPage(1)
  }

  return (
    <div className="space-y-4 p-6">
      <PageHeader
        iconComponent={Megaphone}
        koreanTitle="공고 관리"
        englishSubtitle="RECRUITMENT MANAGEMENT"
      />
      {isLoading && <LoadingState message="공고 목록을 불러오는 중..." />}
      {isError && (
        <ErrorState
          title="불러오기 실패"
          message="잠시 후 다시 시도해 주세요."
        />
      )}

      <RecruitmentFilterSection
        searchText={searchText}
        setSearchText={(nextSearchText) => {
          setSearchText(nextSearchText)
          setCurrentPage(1)
        }}
        statusFilter={statusFilter}
        setStatusFilter={(nextStatusFilter) => {
          setStatusFilter(nextStatusFilter)
          setCurrentPage(1)
        }}
        selectedTags={selectedTags}
        setSelectedTags={(nextSelectedTags) => {
          setSelectedTags(nextSelectedTags)
          setCurrentPage(1)
        }}
        availableTags={availableTags}
      />

      <div className="mb-3 text-sm text-neutral-600">
        총 <span className="font-medium text-neutral-900">{totalCount}</span>건
      </div>

      {hasNoData ? (
        <section className="rounded-xl border border-neutral-200 bg-white shadow-sm">
          <div className="flex flex-col items-center justify-center gap-2 px-6 py-16 text-center">
            <Inbox className="mb-2 h-10 w-10 text-neutral-400" />
            <h3 className="text-base font-semibold text-neutral-800">
              조건에 맞는 공고가 없습니다.
            </h3>
            <p className="max-w-prose text-sm text-neutral-500">
              검색어 또는 태그를 조정해보세요.
            </p>
            {(searchText.trim() ||
              selectedTags.length ||
              statusFilter !== '전체') && (
              <div className="mt-4">
                <button
                  onClick={resetFilters}
                  className="rounded-lg border border-neutral-300 bg-white px-3 py-1.5 text-sm text-neutral-700 hover:bg-neutral-50"
                >
                  초기화
                </button>
              </div>
            )}
          </div>
        </section>
      ) : (
        <>
          <RecruitmentTableSection
            data={paginatedRecruitments}
            onRowClick={handleRowClick}
            sortKey={ordering}
            onSortChange={handleSortChange}
          />

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

      {selectedRecruitment && effectiveDetail && (
        <RecruitmentModal
          open
          onClose={() => {
            if (!isDeleting) setSelectedRecruitment(null)
          }}
          onDelete={() => {
            if (!selectedRecruitment || isDeleting) return
            deleteRecruitment(selectedRecruitment.uuid)
            setSelectedRecruitment(null)
          }}
          detail={effectiveDetail}
        />
      )}
      <ToastContainer />
    </div>
  )
}

export default RecruitmentManagementPage
