import { ReviewSearchField } from './ReviewSearchField'
import { ReviewSortSelect } from './ReviewSortSelect'
import type { ReviewsParams } from '../../../hooks/reviews/useReviewsQuery'
import { useState } from 'react'

type SortKey = NonNullable<ReviewsParams['sortKey']>

interface ReviewFilterSectionProps {
  searchText: string
  onSearchTextChange: (v: string) => void
  onSearchSubmit: (v: string) => void

  sortKey: SortKey
  onSortKeyChange: (v: SortKey) => void

  ratingMin?: number | '전체'
  onRatingMinChange?: (v: number | '전체') => void
}

export const ReviewFilterSection = ({
  searchText,
  onSearchTextChange,
  onSearchSubmit,
  sortKey,
  onSortKeyChange,
}: ReviewFilterSectionProps) => {
  const [sortOpen, setSortOpen] = useState(false)
  return (
    <section className="rounded-lg border border-neutral-200 bg-white p-4 shadow-sm">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex flex-1 flex-col gap-3 sm:flex-row sm:items-center sm:gap-4">
          <ReviewSearchField
            value={searchText}
            onChange={onSearchTextChange}
            onSubmit={onSearchSubmit}
            className="w-full sm:w-80"
            inputClassName="h-10"
          />
        </div>

        <div className="flex w-full justify-end sm:w-auto">
          <ReviewSortSelect
            value={sortKey}
            onChange={onSortKeyChange}
            open={sortOpen}
            setOpen={setSortOpen}
            className="h-10 w-60"
          />
        </div>
      </div>
    </section>
  )
}
