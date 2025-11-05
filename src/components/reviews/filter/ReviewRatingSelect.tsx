import { Select } from '../../FormUI'

interface ReviewRatingSelectProps {
  value: number | '전체'
  onChange: (next: number | '전체') => void
  className?: string
}

const OPTIONS: Array<number | '전체'> = ['전체', 5, 4, 3, 2, 1, 0]

export const ReviewRatingSelect = ({
  value,
  onChange,
  className,
}: ReviewRatingSelectProps) => {
  return (
    <Select
      className={className}
      value={String(value)}
      onChange={(e) => {
        const v = e.target.value
        onChange(v === '전체' ? '전체' : Number(v))
      }}
    >
      {OPTIONS.map((opt) => (
        <option key={String(opt)} value={String(opt)}>
          {opt === '전체' ? '별점 전체' : `${opt}점 이상`}
        </option>
      ))}
    </Select>
  )
}
