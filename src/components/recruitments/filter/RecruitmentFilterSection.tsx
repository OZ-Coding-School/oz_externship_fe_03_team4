import { SearchField } from './SearchField'
import { StatusSelect } from './StatusSelect'
import { TagsFilter } from './TagsFilter'
import type { RecruitmentStatusApi } from '../../../types/recruitments'

interface RecruitmentFilterSectionProps {
  searchText: string
  setSearchText: (nextValue: string) => void
  statusFilter: RecruitmentStatusApi | '전체'
  setStatusFilter: (nextValue: RecruitmentStatusApi | '전체') => void
  selectedTags: string[]
  setSelectedTags: (nextValue: string[]) => void
  availableTags: string[]
}

export const RecruitmentFilterSection = ({
  searchText,
  setSearchText,
  statusFilter,
  setStatusFilter,
  selectedTags,
  setSelectedTags,
  availableTags,
}: RecruitmentFilterSectionProps) => {
  return (
    <section className="rounded-lg border border-neutral-200 bg-white p-4 shadow-sm">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex flex-1 flex-col gap-3 sm:flex-row sm:items-center sm:gap-4">
          <SearchField
            value={searchText}
            onChange={setSearchText}
            placeholder="공고명 검색 키워드를 입력해주세요."
          />
          <TagsFilter
            availableTags={availableTags}
            selectedTags={selectedTags}
            onChange={setSelectedTags}
          />{' '}
        </div>

        <div className="flex w-full justify-end sm:w-auto">
          <StatusSelect value={statusFilter} onChange={setStatusFilter} />
        </div>
      </div>
    </section>
  )
}
