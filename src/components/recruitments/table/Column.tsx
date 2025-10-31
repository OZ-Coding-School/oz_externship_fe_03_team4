import type { ReactNode } from 'react'
import type { Recruitment } from '../../../types/recruitments'
import { RecruitmentStatusBadge } from './RecruitmentStatusBadge'
import { TagPills } from './TagPills'
import { formatDate } from '../../../utils/formatDate'

export type RecruitmentRow = Recruitment & Record<string, unknown>

const numberFormatter = new Intl.NumberFormat('ko-KR')

export const recruitmentColumns = [
  { key: 'id' as const, label: 'ID' },
  {
    key: 'title' as const,
    label: '공고 제목',
    render: (cellValue: unknown, _fullRow: Recruitment) => {
      const titleValue = cellValue as Recruitment['title']
      return (
        <div className="min-w-[16rem] truncate font-medium text-neutral-900">
          {titleValue}
        </div>
      )
    },
  },
  {
    key: 'tags' as const,
    label: '태그',
    render: (cellValue: unknown, _fullRow: Recruitment) => {
      const tagsValue = Array.isArray(cellValue) ? (cellValue as string[]) : []
      return <TagPills tags={tagsValue} />
    },
  },
  {
    key: 'closeAt' as const,
    label: '마감 기한',
    render: (cellValue: unknown, _fullRow: Recruitment) => {
      const closeAtValue = (cellValue as Recruitment['closeAt']) ?? ''
      return (
        <span className="text-[12px] text-neutral-700">
          {formatDate(closeAtValue)}
        </span>
      )
    },
  },
  {
    key: 'status' as const,
    label: '상태',
    render: (cellValue: unknown, _fullRow: Recruitment) => {
      const statusValue = cellValue as Recruitment['status']
      return <RecruitmentStatusBadge status={statusValue} />
    },
  },
  {
    key: 'viewsCount' as const,
    label: '조회수',
    render: (cellValue: unknown, _fullRow: Recruitment) => {
      const viewsCountValue =
        typeof cellValue === 'number' ? cellValue : Number(cellValue ?? 0)
      return numberFormatter.format(viewsCountValue)
    },
  },
  {
    key: 'bookmarksCount' as const,
    label: '북마크',
    render: (cellValue: unknown, _fullRow: Recruitment) => {
      const bookmarksCountValue =
        typeof cellValue === 'number' ? cellValue : Number(cellValue ?? 0)
      return numberFormatter.format(bookmarksCountValue)
    },
  },
  {
    key: 'createdAt' as const,
    label: '생성일시',
    render: (cellValue: unknown, _fullRow: Recruitment) => {
      const createdAtValue = (cellValue as Recruitment['createdAt']) ?? ''
      return (
        <span className="text-[12px] text-neutral-700">
          {formatDate(createdAtValue)}
        </span>
      )
    },
  },
  {
    key: 'updatedAt' as const,
    label: '수정일시',
    render: (cellValue: unknown, _fullRow: Recruitment) => {
      const updatedAtValue =
        (cellValue as Recruitment['updatedAt']) ?? undefined
      return (
        <span className="text-[12px] text-neutral-700">
          {formatDate(updatedAtValue ?? undefined)}
        </span>
      )
    },
  },
] satisfies Array<{
  key: keyof Recruitment
  label?: string
  render?: (value: unknown, row: Recruitment) => ReactNode
}>
