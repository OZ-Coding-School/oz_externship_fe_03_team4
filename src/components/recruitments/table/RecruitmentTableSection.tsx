import { Table } from '../../Data-Indicate/Table'
import type { Recruitment } from '../../../types/recruitments'
import { recruitmentColumns, type RecruitmentRow } from './Column'

interface RecruitmentTableSectionProps {
  data: Recruitment[]
  onRowClick?: (row: Recruitment) => void
}

export const RecruitmentTableSection = ({
  data,
  onRowClick,
}: RecruitmentTableSectionProps) => {
  const rows = data as unknown as RecruitmentRow[]
  return (
    <section className="rounded-xl border border-neutral-200 bg-white shadow-sm">
      <div className="rounded-xl">
        <Table<RecruitmentRow>
          columns={recruitmentColumns}
          data={rows}
          className="rounded-none border-t border-neutral-200"
          onRowClick={(row) => onRowClick?.(row as Recruitment)}
        />
      </div>
    </section>
  )
}
