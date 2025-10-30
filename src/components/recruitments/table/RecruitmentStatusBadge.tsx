import { Badge } from '../../Badge'
import type { RecruitmentStatusApi } from '../../../types/recruitments'

interface Props {
  status: RecruitmentStatusApi
}

export const RecruitmentStatusBadge = ({ status }: Props) => {
  const variant: 'success' | 'default' =
    status === '모집중' ? 'success' : 'default'

  return <Badge label={status} variant={variant} />
}
