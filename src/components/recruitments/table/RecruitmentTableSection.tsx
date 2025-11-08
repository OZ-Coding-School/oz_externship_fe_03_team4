import { Table } from '../../Data-Indicate/Table'
import type { Recruitment } from '../../../types/recruitments'
import { baseRecruitmentColumns, type RecruitmentRow } from './Column'
import { withSortableColumns } from './withSortableColumns'

interface RecruitmentTableSectionProps {
  data: Recruitment[]
  onRowClick?: (row: Recruitment) => void
  sortKey?: string
  onSortChange?: (nextSortKey: string) => void
}

const sortableRecruitmentKeys: Array<keyof RecruitmentRow & string> = [
  'title',
  'viewsCount',
  'bookmarksCount',
  'createdAt',
]

export const RecruitmentTableSection = ({
  data,
  onRowClick,
  sortKey,
  onSortChange,
}: RecruitmentTableSectionProps) => {
  const rows = data as RecruitmentRow[]
  const columns = withSortableColumns<RecruitmentRow>(baseRecruitmentColumns, {
    sortableKeys: sortableRecruitmentKeys,
    sortKey,
    onSortChange,
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
