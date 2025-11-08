import { Table } from '../../Data-Indicate/Table'
import type { Recruitment } from '../../../types/recruitments'
import { baseRecruitmentColumns, type RecruitmentRow } from './Column'
import { withSortableColumns } from './withSortableColumns'
import type { RecruitmentOrdering } from '../../../hooks/recruitments/types.local'

interface RecruitmentTableSectionProps {
  data: Recruitment[]
  onRowClick?: (row: Recruitment) => void
  sortKey?: RecruitmentOrdering
  onSortChange?: (nextOrdering: RecruitmentOrdering) => void
}

const sortableRecruitmentKeys: Array<keyof RecruitmentRow & string> = [
  'title',
  'viewsCount',
  'bookmarksCount',
  'createdAt',
]
const ORDER_TO_SORT: Record<RecruitmentOrdering, string> = {
  latest: '-createdAt',
  oldest: 'createdAt',
  views: '-viewsCount',
  bookmarks: '-bookmarksCount',
}

const SORT_TO_ORDER: Record<string, RecruitmentOrdering> = {
  '-createdAt': 'latest',
  createdAt: 'oldest',
  '-viewsCount': 'views',
  viewsCount: 'views',
  '-bookmarksCount': 'bookmarks',
  bookmarksCount: 'bookmarks',
}

const mapOrderingToSortKey = (
  ordering?: RecruitmentOrdering
): string | undefined =>
  ordering ? (ORDER_TO_SORT[ordering] ?? undefined) : undefined

const mapSortKeyToOrdering = (sortKey: string): RecruitmentOrdering =>
  SORT_TO_ORDER[sortKey] ?? 'latest'

export const RecruitmentTableSection = ({
  data,
  onRowClick,
  sortKey,
  onSortChange,
}: RecruitmentTableSectionProps) => {
  const rows = data as RecruitmentRow[]
  const internalSortKey = mapOrderingToSortKey(sortKey)
  const handleInternalSortChange = (nextSortKey: string) => {
    if (!onSortChange) return
    const nextOrdering = mapSortKeyToOrdering(nextSortKey)
    onSortChange(nextOrdering)
  }
  const columns = withSortableColumns<RecruitmentRow>(baseRecruitmentColumns, {
    sortableKeys: sortableRecruitmentKeys,
    sortKey: internalSortKey,
    onSortChange: handleInternalSortChange,
  })
  return (
    <section className="rounded-xl border border-neutral-200 bg-white shadow-sm">
      <div className="rounded-xl">
        <Table<RecruitmentRow>
          columns={columns}
          data={rows}
          className="rounded-none border-t border-neutral-200"
          onRowClick={(row) => onRowClick?.(row as Recruitment)}
        />
      </div>
    </section>
  )
}
