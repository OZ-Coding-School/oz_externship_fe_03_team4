import type { StatusFilter, AdminSortKey } from '../../../types/applications'
import { SearchField } from './SearchField'
import { SortSelect } from './SortSelect'
import { StatusSelect } from './StatusSelect'

interface ApplicationFilterSectionProps {
  searchText: string
  setSearchText: (v: string) => void
  statusFilter: StatusFilter
  setStatusFilter: (v: StatusFilter) => void
  sortKey: AdminSortKey
  setSortKey: (v: AdminSortKey) => void
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
    <section className="rounded-lg border border-neutral-200 bg-white p-4 shadow-sm">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <SearchField value={searchText} onChange={setSearchText} />
        <div className="flex w-full gap-3 sm:w-auto sm:gap-4 lg:gap-6">
          <StatusSelect value={statusFilter} onChange={setStatusFilter} />
          <SortSelect value={sortKey} onChange={setSortKey} />
        </div>
      </div>
    </section>
  )
}
