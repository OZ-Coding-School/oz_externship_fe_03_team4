import type { ReactNode } from 'react'
import type { Review } from '../../../types/reviews/types'
import { RatingStars } from '../RatingStars'
import { formatDate } from '../../../utils/formatDate'

export type ReviewRow = Review & Record<string, unknown>

export const reviewColumns = [
  {
    key: 'id' as const,
    label: 'ID',
    render: (value: unknown) => String(value),
  },
  {
    key: 'studyTitle' as const,
    label: '스터디 그룹명',
    render: (value: unknown) => (
      <div className="min-w-[14rem] truncate text-neutral-900">
        {String(value ?? '')}
      </div>
    ),
  },
  {
    key: 'authorName' as const,
    label: '작성자',
    render: (_val: unknown, row: ReviewRow) => {
      return (
        <div className="min-w-[12rem]">
          <div className="truncate text-neutral-800">{row.authorName}</div>
          <div className="truncate text-neutral-400">{row.authorEmail}</div>
        </div>
      )
    },
  },
  {
    key: 'summary' as const,
    label: '리뷰내용',
    render: (value: unknown) => (
      <div className="line-clamp-2 max-w-[520px]">{String(value ?? '')}</div>
    ),
  },
  {
    key: 'rating' as const,
    label: '별점',
    render: (value: unknown) => (
      <div className="flex justify-start">
        <RatingStars value={Number(value ?? 0)} />
      </div>
    ),
  },
  {
    key: 'createdAt' as const,
    label: '작성일',
    render: (value: unknown) => (
      <span className="text-[12px] text-neutral-600">
        {formatDate(String(value ?? ''))}
      </span>
    ),
  },
] satisfies Array<{
  key: keyof ReviewRow
  label: string
  render?: (value: unknown, row: ReviewRow) => ReactNode
}>
