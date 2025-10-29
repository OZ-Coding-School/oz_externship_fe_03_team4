import type { StudyGroup } from '../../types/studyGroup/types'
import { StudyGroupStatusBadge } from './StudyGroupStatusBadge'

type StudyGroupTableRowProps = {
  studyGroup: StudyGroup
  index: number
  onClick?: (studyGroup: StudyGroup) => void
}

export const StudyGroupTableRow = ({
  studyGroup,
  index,
  onClick,
}: StudyGroupTableRowProps) => {
  const handleClick = () => {
    onClick?.(studyGroup)
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

      {/* 대표 이미지 */}
      <td className="px-6 py-3">
        <img
          src={studyGroup.profileImg}
          alt={studyGroup.name}
          className="h-12 w-12 rounded-lg object-cover"
        />
      </td>

      {/* 그룹명 */}
      <td className="px-6 py-3">
        <span className="font-medium text-gray-900 hover:underline">
          {studyGroup.name}
        </span>
      </td>

      {/* 인원 현황 */}
      <td className="px-6 py-3 text-gray-700">
        {studyGroup.currentHeadcount} / {studyGroup.maxHeadcount}명
      </td>

      {/* 스터디 기간 */}
      <td className="px-6 py-3 text-gray-700">
        {studyGroup.startAt} ~ {studyGroup.endAt}
      </td>

      {/* 상태 */}
      <td className="px-6 py-3">
        <StudyGroupStatusBadge status={studyGroup.status} />
      </td>

      {/* 생성일시 */}
      <td className="px-6 py-3 text-gray-500">{studyGroup.createdAt}</td>

      {/* 수정일시 */}
      <td className="px-6 py-3 text-gray-500">{studyGroup.updatedAt}</td>
    </tr>
  )
}
