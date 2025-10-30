import { Table } from '../Data-Indicate/Table'
import type { StudyGroup } from '../../types/studyGroup/types'
import { StudyGroupStatusBadge } from './StudyGroupStatusBadge'
import { ArrowUpDown } from 'lucide-react'

type StudyGroupTableProps = {
  studyGroups: StudyGroup[]
  onStudyGroupClick?: (StudyGroup: StudyGroup) => void
  sortKey?: string
  onSortChange?: (key: string) => void
}

type StudyGroupTableData = {
  profileImg: string
  name: string
  headcount: string
  period: string
  status: StudyGroup['status']
  createdAt: string
  updatedAt: string
  _original: StudyGroup
}

const FALLBACK_IMAGE =
  'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 48 48"%3E%3Crect width="48" height="48" fill="%23e5e7eb"/%3E%3Cpath d="M14 18h20M14 24h20M14 30h12" stroke="%239ca3af" stroke-width="2" stroke-linecap="round"/%3E%3C/svg%3E'

export const StudyGroupTable = ({
  studyGroups,
  onStudyGroupClick,
  sortKey,
  onSortChange,
}: StudyGroupTableProps) => {
  const handleSort = (key: string) => {
    if (!onSortChange) return
    if (sortKey === key) {
      onSortChange(`-${key}`)
    } else if (sortKey === `-${key}`) {
      onSortChange(key)
    } else {
      onSortChange(key)
    }
  }

  const tableData: StudyGroupTableData[] = studyGroups.map((group) => ({
    profileImg: group.profileImg,
    name: group.name,
    headcount: `${group.currentHeadcount} / ${group.maxHeadcount}명`,
    period: `${group.startAt} ~ ${group.endAt}`,
    status: group.status,
    createdAt: group.createdAt,
    updatedAt: group.updatedAt,
    _original: group,
  }))
  const tableColumns = [
    {
      key: 'profileImg',
      label: '대표 이미지',
      render: (value: unknown, row: StudyGroupTableData) => (
        <div className="min-w-[3rem] flex-none">
          <img
            src={String(value)}
            alt={row.name}
            className="h-12 w-12 flex-none rounded-lg object-cover"
            onError={(e) => {
              e.currentTarget.src = FALLBACK_IMAGE
            }}
          />
        </div>
      ),
    },
    {
      key: 'name',
      label: (
        <div className="flex items-center gap-2">
          <span>그룹명</span>
          {onSortChange && (
            <button
              onClick={() => handleSort('name')}
              className="flex-shrink-0 text-gray-400 transition-colors hover:text-gray-600"
              aria-label="그룹명 정렬"
            >
              <ArrowUpDown size={16} />
            </button>
          )}
        </div>
      ),
      render: (value: unknown, row: StudyGroupTableData) => (
        <button
          onClick={() => onStudyGroupClick?.(row._original)}
          className="text-left font-medium text-gray-900 hover:underline"
        >
          {String(value)}
        </button>
      ),
    },
    {
      key: 'headcount',
      label: '인원 현황',
      render: (value: unknown) => (
        <span className="whitespace-nowrap text-gray-700">{String(value)}</span>
      ),
    },
    {
      key: 'period',
      label: '스터디 기간',
      render: (value: unknown) => (
        <span className="text-gray-700">{String(value)}</span>
      ),
    },
    {
      key: 'status',
      label: '상태',
      render: (value: unknown) => (
        <StudyGroupStatusBadge status={value as StudyGroup['status']} />
      ),
    },
    {
      key: 'createdAt',
      label: (
        <div className="flex items-center gap-2">
          <span>생성일시</span>
          {onSortChange && (
            <button
              onClick={() => handleSort('createdAt')}
              className="flex-shrink-0 text-gray-400 transition-colors hover:text-gray-600"
              aria-label="생성일시 정렬"
            >
              <ArrowUpDown size={16} />
            </button>
          )}
        </div>
      ),
      render: (value: unknown) => (
        <span className="text-gray-500">{String(value)}</span>
      ),
    },
    {
      key: 'updatedAt',
      label: '수정일시',
      render: (value: unknown) => (
        <span className="text-gray-500">{String(value)}</span>
      ),
    },
  ]

  return (
    <Table
      data={tableData}
      columns={tableColumns}
      className="rounded-lg border border-gray-200"
    />
  )
}
