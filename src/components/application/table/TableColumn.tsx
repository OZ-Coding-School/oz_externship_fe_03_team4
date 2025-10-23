import type { ReactNode } from 'react'
import type { Application } from '../../../types/applications'
import { StatusBadge } from './StatusBadge'

export const applicationColumns = [
  { key: 'id' as const, label: 'ID' },
  { key: 'postingTitle' as const, label: '공고명' },
  {
    key: 'applicant' as const,
    label: '지원자 정보',
    render: (_value, row) => (
      <div className="min-w-[12rem]">
        <div className="truncate text-neutral-800">{row.applicant.name}</div>
        <div className="truncate text-sm text-neutral-400">
          {row.applicant.email}
        </div>
      </div>
    ),
  },
  {
    key: 'status' as const,
    label: '상태',
    render: (value) => <StatusBadge status={value as Application['status']} />,
  },
  { key: 'appliedAt' as const, label: '지원일시' },
  { key: 'updatedAt' as const, label: '수정일시' },
] satisfies Array<{
  key: keyof Application
  label?: string
  render?: (value: unknown, row: Application) => ReactNode
}>
