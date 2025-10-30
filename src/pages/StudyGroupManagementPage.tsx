import { useMemo, useState } from 'react'
import { useSearchParams } from 'react-router'
import {
  STUDY_GROUP_STATUS_OPTIONS,
  type StudyGroup,
  type StudyGroupUiStatus,
  mapStudyGroupDTO,
} from '../types/studyGroup/types'
import { SearchInput } from '../components/search/SearchInput'
import { useDebouncedValue } from '../hooks/useDebouncedValue'
import { mockStudyGroupsData } from '../components/studyGroup/mockStudyGroup'
import { StudyGroupTable } from '../components/studyGroup/StudyGroupTable'
import { AccordionItem } from '../components/Accordion/AccordionType'
import { Accordion } from '../components/Accordion/Accordion'
import { Pagination } from '../components/pagination/Pagination'

const PAGE_SIZE = 10
const StudyGroupManagementPage = () => {
  const [searchParams] = useSearchParams()
  const initialPageNumber = Number(searchParams.get('page') ?? '1')

  const [searchKeyword, setSearchKeyword] = useState<string>('')
  const [selectedStatus, setSelectedStatus] = useState<
    StudyGroupUiStatus | 'ALL'
  >('ALL')
  const [accordionValue, setAccordionValue] = useState<string>('')
  const [currentPage, setCurrentPage] = useState<number>(initialPageNumber)
  const [sortKey, setSortKey] = useState<string>('')

  const debouncedSearch = useDebouncedValue(searchKeyword, 500)

  const studyGroups = useMemo(() => {
    return mockStudyGroupsData.map(mapStudyGroupDTO)
  }, [])

  // 필터링
  const filteredStudyGroups = useMemo((): StudyGroup[] => {
    let filtered = studyGroups

    if (debouncedSearch.trim()) {
      const lowerSearch = debouncedSearch.trim().toLowerCase()
      filtered = filtered.filter((group) =>
        group.name.toLowerCase().includes(lowerSearch)
      )
    }

    if (selectedStatus !== 'ALL') {
      filtered = filtered.filter((group) => group.status === selectedStatus)
    }

    return filtered
  }, [studyGroups, debouncedSearch, selectedStatus])

  // 오름차순 내림차순
  const sortedStudyGroups = useMemo(() => {
    if (!sortKey) return filteredStudyGroups

    const isDescending = sortKey.startsWith('-')
    const key = isDescending ? sortKey.slice(1) : sortKey

    return [...filteredStudyGroups].sort((a, b) => {
      const aValue = a[key as keyof StudyGroup]
      const bValue = b[key as keyof StudyGroup]

      if (aValue === null || bValue === null) return 0

      let comparison = 0
      if (typeof aValue === 'string' && typeof bValue === 'string') {
        comparison = aValue.localeCompare(bValue)
      } else if (typeof aValue === 'number' && typeof bValue === 'number') {
        comparison = aValue - bValue
      }

      return isDescending ? -comparison : comparison
    })
  }, [filteredStudyGroups, sortKey])

  const totalPages = Math.max(
    1,
    Math.ceil(sortedStudyGroups.length / PAGE_SIZE)
  )
  const paginatedStudyGroups = useMemo(() => {
    const startIndex = (currentPage - 1) * PAGE_SIZE
    const endIndex = startIndex + PAGE_SIZE
    return sortedStudyGroups.slice(startIndex, endIndex)
  }, [sortedStudyGroups, currentPage])

  const handleSortChange = (key: string) => {
    setSortKey(key)
    setCurrentPage(1)
  }

  // const handleStudyGroupClick = (studyGroup: StudyGroup) => {
  //   // TODO: 상세 페이지로 이동 또는 모달 열기
  // }

  // 선택된 상태 라벨 계산
  const selectedStatusLabel =
    STUDY_GROUP_STATUS_OPTIONS.find((opt) => opt.value === selectedStatus)
      ?.label || '전체'

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <h1 className="mb-6 text-2xl font-bold text-gray-900">
        스터디 그룹 관리
      </h1>

      <div className="mb-6 space-y-4 rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
        <div className="flex items-start gap-4">
          {/* 검색 입력 */}
          <div className="flex-1">
            <label className="mb-2 block text-sm font-medium text-gray-700">
              검색
            </label>
            <SearchInput
              placeholder="그룹명 검색..."
              value={searchKeyword}
              onChangeText={(nextSearchKeyword) => {
                setSearchKeyword(nextSearchKeyword)
                setCurrentPage(1)
              }}
              clearable
            />
          </div>

          {/* 상태 필터 */}
          <div className="relative w-80">
            <label className="mb-2 block text-sm font-medium text-gray-700">
              스터디 상태
            </label>
            <Accordion
              value={accordionValue}
              onValueChange={setAccordionValue}
              selectedLabels={{ '0': selectedStatusLabel }}
            >
              <AccordionItem title="스터디 상태">
                <div className="absolute top-full right-0 left-0 z-20 mt-2 max-h-80 space-y-2 overflow-auto rounded-lg border border-gray-200 bg-white p-3 shadow-lg">
                  {STUDY_GROUP_STATUS_OPTIONS.map((option) => (
                    <button
                      key={option.value}
                      onClick={() => {
                        setSelectedStatus(
                          option.value as StudyGroupUiStatus | 'ALL'
                        )
                        setAccordionValue('')
                        setCurrentPage(1)
                      }}
                      className={`w-full rounded-md px-3 py-2 text-left text-sm transition-colors ${
                        selectedStatus === option.value
                          ? 'bg-blue-50 font-medium text-blue-700'
                          : 'text-gray-700 hover:bg-gray-50'
                      }`}
                    >
                      {option.label}
                    </button>
                  ))}
                </div>
              </AccordionItem>
            </Accordion>
          </div>
        </div>

        {/* 결과 개수 표시 */}
        <div className="text-sm text-gray-600">
          총{' '}
          <span className="font-semibold text-gray-900">
            {sortedStudyGroups.length}
          </span>
          개의 스터디 그룹
        </div>
      </div>

      {/* 테이블 */}
      {paginatedStudyGroups.length > 0 ? (
        <>
          <StudyGroupTable
            studyGroups={paginatedStudyGroups}
            sortKey={sortKey}
            onSortChange={handleSortChange}
            // onStudyGroupClick={handleStudyGroupClick}
          />

          {/* 페이지네이션 */}
          {totalPages > 1 && (
            <div className="mt-6 flex justify-center">
              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={setCurrentPage}
              />
            </div>
          )}
        </>
      ) : (
        <div className="flex h-64 items-center justify-center rounded-lg border border-gray-200 bg-white">
          <div className="text-center">
            <p className="text-gray-500">검색 결과가 없습니다.</p>
            <p className="mt-1 text-sm text-gray-400">
              다른 검색어를 입력하거나 필터를 변경해보세요.
            </p>
          </div>
        </div>
      )}
    </div>
  )
}

export default StudyGroupManagementPage
