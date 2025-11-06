import { Select } from '../../FormUI'
import type { ReviewsParams } from '../../../hooks/reviews/useReviewsQuery'

type SortKey = NonNullable<ReviewsParams['sortKey']>

interface ReviewSortSelectProps {
  value: SortKey
  onChange: (next: SortKey) => void
  className?: string
}

export const ReviewSortSelect = ({
  value,
  onChange,
  className,
}: ReviewSortSelectProps) => {
  return (
    <Select
      className={className}
      value={value}
      onChange={(e) => onChange(e.target.value as SortKey)}
    >
      <option value="-created_at">작성일 최신순</option>
      <option value="created_at">작성일 오래된순</option>
      <option value="-updated_at">수정일 최신순</option>
      <option value="updated_at">수정일 오래된순</option>
      <option value="-rating">별점 높은순</option>
      <option value="rating">별점 낮은순</option>
    </Select>
  )
}
