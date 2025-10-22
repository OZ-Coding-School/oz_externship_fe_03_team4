import { Lecture } from '../../types/lectureManagement/types'
import { LectureTableRow } from '../Lecture/LectureTableRow'

type LectureTableProps = {
  lectures: Lecture[]
  onLectureClick?: (lecture: Lecture) => void
}

export const LectureTable = ({
  lectures,
  onLectureClick,
}: LectureTableProps) => {
  return (
    <div className="overflow-x-auto rounded-lg border border-gray-200">
      <table className="min-w-full border-collapse bg-white">
        <thead className="bg-gray-50 text-sm font-semibold text-gray-600">
          <tr>
            <th className="w-16 border-b border-gray-200 px-6 py-3 text-left">
              ID
            </th>
            <th className="w-24 border-b border-gray-200 px-6 py-3 text-left">
              썸네일
            </th>
            <th className="border-b border-gray-200 px-6 py-3 text-left">
              강의명
            </th>
            <th className="w-32 border-b border-gray-200 px-6 py-3 text-left">
              강사명
            </th>
            <th className="w-28 border-b border-gray-200 px-6 py-3 text-left">
              플랫폼
            </th>
            <th className="w-44 border-b border-gray-200 px-6 py-3 text-left">
              생성일시
            </th>
            <th className="w-44 border-b border-gray-200 px-6 py-3 text-left">
              수정일시
            </th>
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
              <td colSpan={7} className="px-6 py-12 text-center text-gray-400">
                데이터가 없습니다.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  )
}
