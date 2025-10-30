import { useMemo, useState } from 'react'
import { useSearchParams } from 'react-router' // 여기는 나중에 탱스택으로 바꿀예정입니닷
import { useDebouncedValue } from '../hooks/useDebouncedValue'
import { Pagination } from '../components/pagination/Pagination'
import { RecruitmentFilterSection } from '../components/recruitments/filter/RecruitmentFilterSection'
import type { Recruitment, RecruitmentStatusApi } from '../types/recruitments'
import { RecruitmentTableSection } from '../components/recruitments/table/RecruitmentTableSection'

const PAGE_SIZE = 10

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

  const filteredRecruitments = useMemo(() => {
    let filteredRecruitmentList = mockRecruitments

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

  const totalPages = Math.max(
    1,
    Math.ceil(filteredRecruitments.length / PAGE_SIZE)
  )

  const paginatedRecruitments = useMemo(() => {
    const startIndex = (currentPage - 1) * PAGE_SIZE
    const endIndex = startIndex + PAGE_SIZE
    return filteredRecruitments.slice(startIndex, endIndex)
  }, [filteredRecruitments, currentPage])

  return (
    <div className="space-y-4 p-6">
      <h1 className="text-lg font-semibold text-neutral-800">공고 관리</h1>

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
      <RecruitmentTableSection
        data={paginatedRecruitments}
        onRowClick={(row) => {
          console.log('row clicked:', row.id)
        }}
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
    </div>
  )
}

export default RecruitmentManagementPage
