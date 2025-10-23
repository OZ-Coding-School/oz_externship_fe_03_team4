import type { StatusFilter, SortKey } from '../../../types/applications'
import { SearchField } from './SearchField'
import { SortSelect } from './SortSelect'
import { StatusSelect } from './StatusSelect'

interface ApplicationFilterSectionProps {
  searchText: string
  setSearchText: (v: string) => void
  statusFilter: StatusFilter
  setStatusFilter: (v: StatusFilter) => void
  sortKey: SortKey
  setSortKey: (v: SortKey) => void
}

export const ApplicationFilterSection = ({
  searchText,
  setSearchText,
  statusFilter,
  setStatusFilter,
  sortKey,
  setSortKey,
}: ApplicationFilterSectionProps) => {
  return (
    <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
      <SearchField value={searchText} onChange={setSearchText} />
      <div className="flex w-full gap-2 sm:w-auto">
        <StatusSelect value={statusFilter} onChange={setStatusFilter} />
        <SortSelect value={sortKey} onChange={setSortKey} />
      </div>
    </div>
  )
}
