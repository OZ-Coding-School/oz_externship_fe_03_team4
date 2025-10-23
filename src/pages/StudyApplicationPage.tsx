import { useMemo, useState } from 'react'
import { useSearchParams } from 'react-router'
import { Pagination } from '../components/pagination/Pagination'
import { ApplicationFilterSection } from '../components/application/filter/ApplicationFilterSection'
import { ApplicationTableSection } from '../components/application/table/ApplicationTableSection'
import type {
  Application,
  ApplicationStatus,
  SortKey,
  StatusFilter,
} from '../types/applications'

const PAGE_SIZE = 10

const StudyApplicationPage = () => {
  const [searchParams] = useSearchParams()
  const initialPageNumber = Number(searchParams.get('page') ?? '1')

  const [searchText, setSearchText] = useState<string>('')
  const [statusFilter, setStatusFilter] = useState<StatusFilter>('전체')
  const [sortKey, setSortKey] = useState<SortKey>('-appliedAt')
  const [currentPage, setCurrentPage] = useState<number>(initialPageNumber)

  const mockApplications: Application[] = useMemo(() => {
    const statuses: ApplicationStatus[] = ['승인', '검토중', '대기', '거절']
    return Array.from({ length: 28 }).map((_, index) => ({
      id: `#${1000 + index}`,
      postingTitle: `공고 ${index + 1}`,
      applicant: {
        name: `홍길동${index + 1}`,
        email: `user${index + 1}@mail.com`,
      },
      status: statuses[index % statuses.length],
      appliedAt: '2025-10-21 14:22',
      updatedAt: '2025-10-22 09:13',
    }))
  }, [])

  const filteredApplications = useMemo(() => {
    let filteredList = mockApplications

    if (statusFilter !== '전체') {
      filteredList = filteredList.filter(
        (application) => application.status === statusFilter
      )
    }

    if (searchText.trim()) {
      const lowerCaseSearchText = searchText.trim().toLowerCase()
      filteredList = filteredList.filter(
        (application) =>
          application.applicant.name
            .toLowerCase()
            .includes(lowerCaseSearchText) ||
          application.applicant.email
            .toLowerCase()
            .includes(lowerCaseSearchText)
      )
    }

    return filteredList
  }, [mockApplications, searchText, statusFilter])

  const totalPages = Math.max(
    1,
    Math.ceil(filteredApplications.length / PAGE_SIZE)
  )

  const paginatedApplications = useMemo(() => {
    const startIndex = (currentPage - 1) * PAGE_SIZE
    const endIndex = startIndex + PAGE_SIZE
    return filteredApplications.slice(startIndex, endIndex)
  }, [filteredApplications, currentPage])

  return (
    <div className="space-y-4 p-6">
      <h1 className="text-neutral text-lg font-semibold">지원 내역 관리</h1>

      <ApplicationFilterSection
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
        sortKey={sortKey}
        setSortKey={setSortKey}
      />

      <ApplicationTableSection data={paginatedApplications} />

      {filteredApplications.length > 0 && (
        <div className="justfiy-end flex">
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

export default StudyApplicationPage
