import {
  STUDY_GROUP_STATUS_BADGE,
  type StudyGroupUiStatus,
} from '../../types/studyGroup/types'
import { Badge } from '../Badge'

interface StudyGroupStatusBadgeProps {
  status: StudyGroupUiStatus
}

export const StudyGroupStatusBadge = ({
  status,
}: StudyGroupStatusBadgeProps) => {
  return (
    <div className="inline-block whitespace-nowrap">
      <Badge label={status} variant={STUDY_GROUP_STATUS_BADGE[status]} />
    </div>
  )
}
