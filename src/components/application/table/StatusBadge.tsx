import { Badge } from '../../Badge'
import type { ApplicationStatus } from '../../../types/applications'

interface StatusBadgeProps {
  status: ApplicationStatus
}

export const StatusBadge = ({ status }: StatusBadgeProps) => {
  const variantMap: Record<
    ApplicationStatus,
    'success' | 'info' | 'warning' | 'danger'
  > = {
    승인: 'success',
    검토중: 'info',
    대기: 'warning',
    거절: 'danger',
  }

  return <Badge label={status} variant={variantMap[status]} />
}
