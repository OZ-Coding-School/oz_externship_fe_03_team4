import { Table } from '../../Data-Indicate/Table'
import { reviewColumns, type ReviewRow } from './Column'
import type { Review } from '../../../types/reviews/types'

interface ReviewTableSectionProps {
  data: Review[]
  onRowClick?: (row: Review) => void
}

export const ReviewTableSection = ({
  data,
  onRowClick,
}: ReviewTableSectionProps) => {
  const rows = data as ReviewRow[]
  return (
    <section className="rounded-xl border border-neutral-200 bg-white shadow-sm">
      <div className="rounded-xl">
        <Table<ReviewRow>
          columns={reviewColumns}
          data={rows}
          className="rounded-none border-t border-neutral-200"
          onRowClick={(row) => onRowClick?.(row as Review)}
        />
      </div>
    </section>
  )
}
