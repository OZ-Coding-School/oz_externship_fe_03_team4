import { Table } from '../Data-Indicate/Table'
import type { StudyGroup } from '../../types/studyGroup/types'
import { StudyGroupStatusBadge } from './StudyGroupStatusBadge'

type StudyGroupTableProps = {
  studyGroups: StudyGroup[]
  onStudyGroupClick?: (StudyGroup: StudyGroup) => void
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

export const StudyGroupTable = ({
  studyGroups,
  onStudyGroupClick,
}: StudyGroupTableProps) => {
  const tableData: StudyGroupTableData[] = studyGroups.map((group) => ({
    profileImg: group.profileImg,
    name: group.name,
    headcount: `${group.currentHeadcount} / ${group.maxHeadcount}명`,
    period: `${group.startAt} ~ ${group.endAt}`,
    status: group.status,
    createdAt: group.startAt,
    updatedAt: group.endAt,
    _original: group,
  }))
  const tableColumns = [
    {
      key: 'profileImg',
      label: '대표 이미지',
      render: (value: unknown, row: StudyGroupTableData) => (
        <img
          src={String(value)}
          alt={row.name}
          className="h-12 w-12 rounded-lg object-cover"
        />
      ),
    },
    {
      key: 'name',
      label: '그룹명',
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
        <span className="text-gray-700">{String(value)}</span>
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
      label: '생성일시',
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
