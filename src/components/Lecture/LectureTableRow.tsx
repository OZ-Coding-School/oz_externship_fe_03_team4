import type { Lecture } from '../../types/lectureManagement/types'
import { LectureThumbnail } from '../lecture/LectureThumbnail'
import { PlatformBadge } from '../lecture/PlatformBadge'

type LectureTableRowProps = {
  lecture: Lecture
  index: number
  onClick?: (lecture: Lecture) => void
}

export const LectureTableRow = ({
  lecture,
  index,
  onClick,
}: LectureTableRowProps) => {
  const handleClick = () => {
    onClick?.(lecture)
  }

  return (
    <tr
      onClick={handleClick}
      className={`border-b border-gray-100 transition-colors ${
        onClick ? 'cursor-pointer hover:bg-gray-50' : ''
      }`}
    >
      {/* ID */}
      <td className="px-6 py-3 font-medium text-gray-900">{index}</td>

      {/* 썸네일 */}
      <td className="px-6 py-3">
        <LectureThumbnail src={lecture.thumbnail} alt={lecture.title} />
      </td>

      {/* 강의명 */}
      <td className="px-6 py-3">
        <span className="font-medium text-gray-900 hover:underline">
          {lecture.title}
        </span>
      </td>

      {/* 강사명 */}
      <td className="px-6 py-3 text-gray-700">{lecture.instructor}</td>

      {/* 플랫폼 */}
      <td className="px-6 py-3">
        <PlatformBadge platform={lecture.platform} />
      </td>

      {/* 생성일시 */}
      <td className="px-6 py-3 text-gray-500">{lecture.createdAt}</td>

      {/* 수정일시 */}
      <td className="px-6 py-3 text-gray-500">{lecture.updatedAt}</td>
    </tr>
  )
}
