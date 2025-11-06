import { SearchInput } from '../search/SearchInput'
import { Accordion } from '../Accordion/Accordion'
import { AccordionItem } from '../Accordion/AccordionType'
import {
  STUDY_GROUP_STATUS_OPTIONS,
  type StudyGroupUiStatus,
} from '../../types/studyGroup/types'

interface SearchAndFilterSectionProps {
  searchKeyword: string
  onSearchChange: (keyword: string) => void
  selectedStatus: StudyGroupUiStatus | 'ALL'
  accordionValue: string
  selectedStatusLabel: string
  onStatusChange: (status: StudyGroupUiStatus | 'ALL') => void
  onAccordionChange: (value: string) => void
  totalCount: number
}

export const SearchAndFilterSection = ({
  searchKeyword,
  onSearchChange,
  selectedStatus,
  accordionValue,
  selectedStatusLabel,
  onStatusChange,
  onAccordionChange,
  totalCount,
}: SearchAndFilterSectionProps) => {
  return (
    <div className="my-6 space-y-4 rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
      <div className="flex items-start gap-4">
        {/* 검색 입력 */}
        <div className="flex-1">
          <label className="mb-2 block text-sm font-medium text-gray-700">
            검색
          </label>
          <SearchInput
            placeholder="그룹명 검색..."
            value={searchKeyword}
            onChangeText={onSearchChange}
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
            onValueChange={onAccordionChange}
            selectedLabels={{ '0': selectedStatusLabel }}
          >
            <AccordionItem title="스터디 상태">
              <div className="absolute top-full right-0 left-0 z-20 mt-2 max-h-80 space-y-2 overflow-auto rounded-lg border border-gray-200 bg-white p-3 shadow-lg">
                {STUDY_GROUP_STATUS_OPTIONS.map((option) => (
                  <button
                    key={option.value}
                    onClick={() => {
                      onStatusChange(option.value as StudyGroupUiStatus | 'ALL')
                      onAccordionChange('')
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
        총 <span className="font-semibold text-gray-900">{totalCount}</span>
        개의 스터디 그룹
      </div>
    </div>
  )
}
