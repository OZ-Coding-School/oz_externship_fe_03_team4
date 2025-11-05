import { useMemo, useState } from 'react'
import { useSearchParams } from 'react-router' // 여기는 나중에 탱스택으로 바꿀예정입니닷
import { useDebouncedValue } from '../hooks/useDebouncedValue'
import { Pagination } from '../components/pagination/Pagination'
import { RecruitmentFilterSection } from '../components/recruitments/filter/RecruitmentFilterSection'
import type { Recruitment, RecruitmentStatusApi } from '../types/recruitments'
import { RecruitmentTableSection } from '../components/recruitments/table/RecruitmentTableSection'
import { Inbox, Megaphone } from 'lucide-react'
import { RecruitmentModal } from '../components/recruitments/modal/RecruitmentModal'
// import { useAdminRecruitmentsQuery } from '../hooks/recruitments/useRecruitmentsQuery'
import { PageHeader } from '../components/PageHeader'

const PAGE_SIZE = 10
// 여기서부터
const TAGS = [
  // 가짜 목데이터
  ['React', 'Frontend'],
  ['Python', 'Django'],
  ['TypeScript', 'Frontend'],
  ['Java', 'Spring'],
  ['Next.js', 'Fullstack'],
]

const STATUSES: RecruitmentStatusApi[] = ['모집중', '마감']

const mockRecruitments: Recruitment[] = Array.from({ length: 15 }).map(
  (_, index) => ({
    id: index + 1,
    title: `스터디 구인 공고 ${index + 1}`,
    tags: TAGS[index % TAGS.length],
    closeAt: `2025-11-${String((index % 28) + 1).padStart(2, '0')}T23:59:59Z`,
    status: STATUSES[index % STATUSES.length],
    viewsCount: Math.floor(Math.random() * 300 + 50),
    bookmarksCount: Math.floor(Math.random() * 50 + 10),
    createdAt: `2025-10-${String((index % 20) + 1).padStart(2, '0')}T12:00:00Z`,
    updatedAt: `2025-10-${String((index % 20) + 2).padStart(2, '0')}T15:00:00Z`,
  })
)

const ALL_TAGS = Array.from(new Set(mockRecruitments.flatMap((r) => r.tags))) // 전체 태그 목록
// 여기까지 목업데이터 입니닷.
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

  const [selectedRecruitment, setSelectedRecruitment] =
    useState<Recruitment | null>(null)
  // const {
  //   data: _data,
  //   isLoading: _isLoading,
  //   isError: _isError,
  // } = useAdminRecruitmentsQuery({
  //   searchText: debouncedSearchText,
  //   statusFilter: statusFilter === '전체' ? undefined : statusFilter,
  //   selectedTags,
  //   ordering: 'latest',
  //   pageNumber: currentPage,
  //   pageSize: PAGE_SIZE,
  // })
  const filteredRecruitments = useMemo(() => {
    let filteredRecruitmentList = mockRecruitments
    // let filteredRecruitmentList = data?.items ?? []

    if (statusFilter !== '전체') {
      filteredRecruitmentList = filteredRecruitmentList.filter(
        (recruitment) => recruitment.status === statusFilter
      )
    }
    if (debouncedSearchText.trim()) {
      const lowerSearchText = debouncedSearchText.toLowerCase().trim()
      filteredRecruitmentList = filteredRecruitmentList.filter(
        (recruitment) =>
          recruitment.title.toLowerCase().includes(lowerSearchText) ||
          recruitment.tags.some((tag) =>
            tag.toLowerCase().includes(lowerSearchText)
          )
      )
    }

    if (selectedTags.length > 0) {
      const selectedTagSet = new Set(selectedTags)
      filteredRecruitmentList = filteredRecruitmentList.filter((recruitment) =>
        recruitment.tags.some((tag) => selectedTagSet.has(tag))
      )
    }

    return filteredRecruitmentList
  }, [statusFilter, debouncedSearchText, selectedTags])
  // }, [data?.items, debouncedSearchText, statusFilter, selectedTags])

  const hasNoData = filteredRecruitments.length === 0

  const totalPages = Math.max(
    1,
    Math.ceil(filteredRecruitments.length / PAGE_SIZE)
  )

  const paginatedRecruitments = useMemo(() => {
    const startIndex = (currentPage - 1) * PAGE_SIZE
    const endIndex = startIndex + PAGE_SIZE
    return filteredRecruitments.slice(startIndex, endIndex)
  }, [filteredRecruitments, currentPage])

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
        availableTags={ALL_TAGS}
      />

      <div className="mb-3 text-sm text-neutral-600">
        총{' '}
        <span className="font-medium text-neutral-900">
          {filteredRecruitments.length}
        </span>
        건
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
            onRowClick={(row) => setSelectedRecruitment(row)}
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

      {selectedRecruitment && (
        <RecruitmentModal
          open
          onClose={() => setSelectedRecruitment(null)}
          onDelete={() => setSelectedRecruitment(null)}
          detail={{
            ...selectedRecruitment,
            uuid: '',
            expectedHeadcount: 0,
            estimatedFee: 0,
            attachments: [],
            lectures: [],
            applications: [],
            content: '',
            isClosed: false,
          }}
        />
      )}
    </div>
  )
}

export default RecruitmentManagementPage
