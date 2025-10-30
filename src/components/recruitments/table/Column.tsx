import type { ReactNode } from 'react'
import type { Recruitment } from '../../../types/recruitments'
import { RecruitmentStatusBadge } from './RecruitmentStatusBadge'
import { TagPills } from './TagPills'
import { formatDate } from '../../../utils/formatDate'

const numberFormatter = new Intl.NumberFormat('ko-KR')

export const recruitmentColumns = [
  { key: 'id' as const, label: 'ID' },
  {
    key: 'title' as const,
    label: '공고 제목',
    render: (title: string) => (
      <div className="min-w-[16rem] truncate font-medium text-neutral-900">
        {title}
      </div>
    ),
  },
  {
    key: 'tags' as const,
    label: '태그',
    render: (tags: string[]) => <TagPills tags={tags} />,
  },
  {
    key: 'closeAt' as const,
    label: '마감 기한',
    render: (closeAt: string) => (
      <span className="text-neutral text-[12px]">{formatDate(closeAt)}</span>
    ),
  },
  {
    key: 'status' as const,
    label: '상태',
    render: (status: Recruitment['status']) => (
      <RecruitmentStatusBadge status={status} />
    ),
  },
  {
    key: 'viewsCount' as const,
    label: '조회수',
    render: (viewsCount: number) => numberFormatter.format(viewsCount),
  },
  {
    key: 'bookmarksCount' as const,
    label: '북마크',
    render: (bookmarksCount: number) => numberFormatter.format(bookmarksCount),
  },
  {
    key: 'createdAt' as const,
    label: '생성일시',
    render: (createdAt: string) => (
      <span className="text-[12px] text-neutral-700">
        {formatDate(createdAt)}
      </span>
    ),
  },
  {
    key: 'updatedAt' as const,
    label: '수정일시',
    render: (updatedAt: string | null) => (
      <span className="text-[12px] text-neutral-700">
        {formatDate(updatedAt ?? undefined)}
      </span>
    ),
  },
] satisfies Array<{
  key: keyof Recruitment
  label?: string
  render?: (value: unknown, row: Recruitment) => ReactNode
}>
