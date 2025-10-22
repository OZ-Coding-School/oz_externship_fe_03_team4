import type { Lecture } from '../../types/lectureManagement/types'
import { LectureTableRow } from '../Lecture/LectureTableRow'

type LectureTableProps = {
  lectures: Lecture[]
  onLectureClick?: (lecture: Lecture) => void
}

type ColumnTable = {
  key: string
  label: string
  width?: string
}

const COLUMNS: ColumnTable[] = [
  { key: 'id', label: 'ID', width: 'w-16' },
  { key: 'thumbnail', label: '썸네일', width: 'w-24' },
  { key: 'title', label: '강의명' },
  { key: 'instructor', label: '강사명', width: 'w-32' },
  { key: 'platform', label: '플랫폼', width: 'w-28' },
  { key: 'createdAt', label: '생성일시', width: 'w-44' },
  { key: 'updatedAt', label: '수정일시', width: 'w-44' },
]

const TABLE_HEADER_STYLE = 'border-b border-gray-200 px-6 py-3 text-left'

export const LectureTable = ({
  lectures,
  onLectureClick,
}: LectureTableProps) => {
  return (
    <div className="overflow-x-auto rounded-lg border border-gray-200">
      <table className="min-w-full border-collapse bg-white">
        <thead className="bg-gray-50 text-sm font-semibold text-gray-600">
          <tr>
            {COLUMNS.map((column) => (
              <th
                key={column.key}
                className={`${TABLE_HEADER_STYLE} ${column.width ?? ''}`}
              >
                {column.label}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="text-sm text-gray-700">
          {lectures.length > 0 ? (
            lectures.map((lecture, index) => (
              <LectureTableRow
                key={lecture.id}
                lecture={lecture}
                index={index + 1}
                onClick={onLectureClick}
              />
            ))
          ) : (
            <tr>
              <td
                colSpan={COLUMNS.length}
                className="px-6 py-12 text-center text-gray-400"
              >
                데이터가 없습니다.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  )
}
