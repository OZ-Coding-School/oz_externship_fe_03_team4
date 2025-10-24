import { useMemo, useState } from 'react'
import { useSearchParams } from 'react-router'
import { Pagination } from '../components/pagination/Pagination'
import { ApplicationFilterSection } from '../components/application/filter/ApplicationFilterSection'
import { ApplicationTableSection } from '../components/application/table/ApplicationTableSection'
import {
  type Application,
  type AdminApplicationApi,
  type AdminApplicationStatus,
  type AdminSortKey,
  type StatusFilter,
  // apiStatusToUi,
  uiStatusToApi,
  mapAdminApiToUi,
} from '../types/applications'
import { useDebouncedValue } from '../hooks/useDebouncedValue'

const PAGE_SIZE = 10
const StudyApplicationPage = () => {
  const [searchParams] = useSearchParams()
  const initialPageNumber = Number(searchParams.get('page') ?? '1')

  const [searchText, setSearchText] = useState<string>('')
  const [statusFilter, setStatusFilter] = useState<StatusFilter>('전체')
  const [sortKey, setSortKey] = useState<AdminSortKey>('-created_at')
  const [currentPage, setCurrentPage] = useState<number>(initialPageNumber)
  const debouncedSearchText = useDebouncedValue(searchText, 300)

  const mockApplications: AdminApplicationApi[] = useMemo(() => {
    const statuses: AdminApplicationStatus[] = [
      'APPROVED',
      'APPLIED',
      'PENDING',
      'REJECTED',
    ]
    return Array.from({ length: 30 }).map((_, index) => ({
      // id: `#${1000 + index}`, api연동시에는 이걸 사용
      id: 1000 + index,
      recruitment_title: `공고 ${index + 1}`,
      applicant_nickname: `홍길동${index + 1}`,
      applicant_email: `user${index + 1}@gmail.com`,
      status: statuses[index % statuses.length],
      created_at: new Date(
        `2025-10-21T14:${String(index % 60).padStart(2, '0')}:00Z`
      ).toISOString(),
      updated_at: new Date(
        `2025-10-22T09:${String(index % 60).padStart(2, '0')}:00Z`
      ).toISOString(),
    }))
  }, [])

  const filteredApplications = useMemo((): Application[] => {
    let filteredList = mockApplications

    if (statusFilter !== '전체') {
      const apiCode = uiStatusToApi[statusFilter]
      filteredList = filteredList.filter(
        (application) => application.status === apiCode
      )
    }

    if (debouncedSearchText.trim()) {
      const lowerCaseSearchText = debouncedSearchText.trim().toLowerCase()
      filteredList = filteredList.filter(
        (application) =>
          application.recruitment_title
            .toLowerCase()
            .includes(lowerCaseSearchText) ||
          application.applicant_nickname
            .toLowerCase()
            .includes(lowerCaseSearchText) ||
          application.applicant_email
            .toLowerCase()
            .includes(lowerCaseSearchText)
      )
    }

    // 정렬 부분
    const isDescending = sortKey.startsWith('-')
    const sortTargetKey = (isDescending ? sortKey.slice(1) : sortKey) as
      | 'created_at'
      | 'updated_at'

    filteredList = [...filteredList].sort((firstItem, secondItem) => {
      const firstValue =
        sortTargetKey === 'created_at'
          ? Date.parse(firstItem.created_at)
          : Date.parse(firstItem.updated_at)

      const secondValue =
        sortTargetKey === 'created_at'
          ? Date.parse(secondItem.created_at)
          : Date.parse(secondItem.updated_at)

      return isDescending ? secondValue - firstValue : firstValue - secondValue
    })
    return filteredList.map(mapAdminApiToUi)
  }, [mockApplications, debouncedSearchText, statusFilter, sortKey])

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
        setSortKey={(nextSortKey) => {
          setSortKey(nextSortKey)
          setCurrentPage(1)
        }}
      />

      <ApplicationTableSection data={paginatedApplications} />

      {filteredApplications.length > 0 && (
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

export default StudyApplicationPage
