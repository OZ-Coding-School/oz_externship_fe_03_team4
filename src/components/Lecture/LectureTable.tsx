import { Table } from '../Data-Indicate/Table'
import type { Lecture } from '../../types/lectureManagement/types'
import { PlatformBadge } from './PlatformBadge'
import { LectureThumbnail } from '../Lecture/LectureThumbnail'

type LectureTableProps = {
  lectures: Lecture[]
  onLectureClick?: (lecture: Lecture) => void
}

type LectureTableData = {
  id: string
  thumbnail: string
  title: string
  instructor: string
  platform: 'Udemy' | 'Inflearn'
  createdAt: string
  updatedAt: string
  _original: Lecture
}

export const LectureTable = ({
  lectures,
  onLectureClick,
}: LectureTableProps) => {
  const tableData: LectureTableData[] = lectures.map((lecture, index) => ({
    id: String(index + 1),
    thumbnail: lecture.thumbnail,
    title: lecture.title,
    instructor: lecture.instructor,
    platform: lecture.platform,
    createdAt: lecture.createdAt,
    updatedAt: lecture.updatedAt,
    _original: lecture,
  }))

  const tableColumns = [
    {
      key: 'id',
      label: 'ID',
      render: (value: unknown) => (
        <span className="font-medium text-gray-900">{String(value)}</span>
      ),
    },
    {
      key: 'thumbnail',
      label: '썸네일',
      render: (value: unknown, row: LectureTableData) => (
        <LectureThumbnail src={String(value)} alt={row.title} />
      ),
    },
    {
      key: 'title',
      label: '강의명',
      render: (value: unknown, row: LectureTableData) => (
        <button
          onClick={() => onLectureClick?.(row._original)}
          className="text-left font-medium text-gray-900 hover:underline"
        >
          {String(value)}
        </button>
      ),
    },
    {
      key: 'instructor',
      label: '강사명',
      render: (value: unknown) => (
        <span className="text-gray-700">{String(value)}</span>
      ),
    },
    {
      key: 'platform',
      label: '플랫폼',
      render: (value: unknown) => (
        <PlatformBadge platform={value as 'Udemy' | 'Inflearn'} />
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
