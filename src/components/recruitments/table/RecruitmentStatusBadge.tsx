import { Badge } from '../../Badge'
import type { RecruitmentStatusApi } from '../../../types/recruitments'

interface RecruitmentStatusBadgeProps {
  status: RecruitmentStatusApi
  className?: string
}

export const RecruitmentStatusBadge = ({
  status,
  className = '',
}: RecruitmentStatusBadgeProps) => {
  const variant: 'success' | 'default' =
    status === '모집중' ? 'success' : 'default'

  return <Badge label={status} variant={variant} className={className} />
}
