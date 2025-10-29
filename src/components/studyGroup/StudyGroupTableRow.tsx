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

  const BASE_STYLE = 'px-6 py-3'
  const TEXT_BASE = 'text-gray-900'
  const TEXT_TD = `${BASE_STYLE} text-gray-700`
  const DATE_TD = `${BASE_STYLE} text-gray-500`

  return (
    <tr
      onClick={handleClick}
      className={`border-b border-gray-100 transition-colors ${
        onClick ? 'cursor-pointer hover:bg-gray-50' : ''
      }`}
    >
      {/* ID */}
      <td className={`${BASE_STYLE} font-medium ${TEXT_BASE}`}>{index}</td>

      {/* 대표 이미지 */}
      <td className={BASE_STYLE}>
        <img
          src={studyGroup.profileImg}
          alt={studyGroup.name}
          className="h-12 w-12 rounded-lg object-cover"
        />
      </td>

      {/* 그룹명 */}
      <td className={BASE_STYLE}>
        <span className={`font-medium ${TEXT_BASE} hover:underline`}>
          {studyGroup.name}
        </span>
      </td>

      {/* 인원 현황 */}
      <td className={`${BASE_STYLE} ${TEXT_TD}`}>
        {studyGroup.currentHeadcount} / {studyGroup.maxHeadcount}명
      </td>

      {/* 스터디 기간 */}
      <td className={`${BASE_STYLE} ${TEXT_TD}`}>
        {studyGroup.startAt} ~ {studyGroup.endAt}
      </td>

      {/* 상태 */}
      <td className={BASE_STYLE}>
        <StudyGroupStatusBadge status={studyGroup.status} />
      </td>

      {/* 생성일시 */}
      <td className={`${BASE_STYLE} ${DATE_TD}`}>{studyGroup.createdAt}</td>

      {/* 수정일시 */}
      <td className={`${BASE_STYLE} ${DATE_TD}`}>{studyGroup.updatedAt}</td>
    </tr>
  )
}
