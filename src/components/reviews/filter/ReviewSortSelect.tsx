import type { ReviewsParams } from '../../../hooks/reviews/useReviewsQuery'
import { Accordion } from '../../Accordion/Accordion'

type SortKey = NonNullable<ReviewsParams['sortKey']>

interface ReviewSortSelectProps {
  value: SortKey
  onChange: (next: SortKey) => void
  open: boolean
  setOpen: (v: boolean) => void
  className?: string
}

const OPTIONS: SortKey[] = [
  '-created_at',
  'created_at',
  '-updated_at',
  'updated_at',
  '-rating',
  'rating',
]

const LABEL_MAP: Record<SortKey, string> = {
  '-created_at': '작성일 최신순',
  created_at: '작성일 오래된순',
  '-updated_at': '수정일 최신순',
  updated_at: '수정일 오래된순',
  '-rating': '별점 높은순',
  rating: '별점 낮은순',
}

export const ReviewSortSelect = ({
  value,
  onChange,
  className,
  open,
  setOpen,
}: ReviewSortSelectProps) => {
  const header = LABEL_MAP[value]

  return (
    <div className={className}>
      <Accordion
        value={open ? '0' : ''}
        onValueChange={(v) => setOpen(v === '0')}
        selectedLabels={{ '0': header }}
      >
        <div title="정렬">
          <div className="absolute z-20 w-44 overflow-hidden rounded-md border border-gray-200 bg-white shadow-lg">
            {OPTIONS.map((option) => {
              const selected = option === value
              return (
                <button
                  key={option}
                  onClick={() => {
                    onChange(option)
                    setOpen(false)
                  }}
                  className={[
                    'flex w-full items-center justify-between px-3 py-3 text-sm',
                    selected
                      ? 'bg-amber-100 font-medium text-gray-900'
                      : 'text-gray-700',
                    'transition-colors hover:bg-amber-100',
                  ].join(' ')}
                >
                  <span>{LABEL_MAP[option]}</span>
                </button>
              )
            })}
          </div>
        </div>
      </Accordion>
    </div>
  )
}
