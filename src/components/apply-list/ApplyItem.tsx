import { User } from 'lucide-react'
import { Badge } from '../Badge'
import { formatDate } from '../../utils/formatDate'

export type Applicant = {
  nickname: string
  email?: string
  applied_at?: string
  status?: '지원중' | '검토중' | '거절' | '승인'
}

type ApplyItemProps = {
  applicant: Applicant
  onClick?: (id: string) => void
  onMoreClick?: (id: string) => void
}

const statusToVariant: Record<
  NonNullable<Applicant['status']>,
  'success' | 'warning' | 'danger' | 'info'
> = {
  지원중: 'info',
  검토중: 'warning',
  거절: 'danger',
  승인: 'success',
}

export const ApplyItem = ({ applicant, onClick }: ApplyItemProps) => {
  const { nickname, email, status = '지원중', applied_at } = applicant
  // const statusCls = statusStyle[status] ?? 'bg-gray-100 text-gray-700'
  const dateText = formatDate(applied_at)

  return (
    <div
      role="button"
      onClick={() => onClick?.(nickname)}
      className="flex w-full items-center gap-4 rounded-xl border border-gray-200 bg-white p-4 hover:bg-gray-50"
    >
      <div className="flex w-full flex-col">
        <div className="mb-2 flex justify-between gap-2">
          <div className="flex items-center gap-2">
            <User className="h-4 w-4" />
            <div className="truncate text-sm font-semibold">{nickname}</div>
          </div>

          <Badge
            variant={statusToVariant[status] ?? 'default'}
            label={status}
          />
        </div>

        <div className="min-w-0">
          <div className="mt-1 flex flex-col gap-1 text-xs text-gray-600">
            {email && <div className="inline-flex">이메일: {email}</div>}
            {dateText && (
              <div className="hidden items-center gap-1 text-xs text-gray-500 md:inline-flex">
                지원 일시: {dateText}
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="flex items-center gap-3"></div>
    </div>
  )
}
