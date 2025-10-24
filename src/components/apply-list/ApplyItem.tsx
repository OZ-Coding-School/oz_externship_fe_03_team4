import { User } from 'lucide-react'
import { Badge } from '../Badge'

export type Applicant = {
  id: string
  name: string
  avatarUrl?: string
  email?: string
  status?: '대기' | '검토중' | '거절' | '승인'
  appliedAt?: string
}

type ApplyItemProps = {
  applicant: Applicant
  onClick?: (id: string) => void
  onMoreClick?: (id: string) => void
}

// const statusStyle: Record<NonNullable<Applicant['status']>, string> = {
//   new: 'bg-blue-50 text-blue-700',
//   review: 'bg-amber-50 text-amber-700',
//   interview: 'bg-purple-50 text-purple-700',
//   rejected: 'bg-red-50 text-red-700',
//   accepted: 'bg-green-50 text-green-700',
// }

const statusToVariant: Record<
  NonNullable<Applicant['status']>,
  'default' | 'primary' | 'success' | 'warning' | 'danger' | 'info'
> = {
  대기: 'primary',
  검토중: 'warning',
  거절: 'danger',
  승인: 'success',
}

function formatDate(iso?: string) {
  if (!iso) return ''
  const d = new Date(iso)
  if (Number.isNaN(d.getTime())) return ''
  const y = d.getFullYear()
  const m = String(d.getMonth() + 1).padStart(2, '0')
  const day = String(d.getDate()).padStart(2, '0')
  const hh = String(d.getHours()).padStart(2, '0')
  const mm = String(d.getMinutes()).padStart(2, '0')
  return `${y}-${m}-${day} ${hh}:${mm}`
}

export const ApplyItem = ({ applicant, onClick }: ApplyItemProps) => {
  const { id, name, email, status = '대기', appliedAt } = applicant
  // const statusCls = statusStyle[status] ?? 'bg-gray-100 text-gray-700'
  const dateText = formatDate(appliedAt)

  return (
    <div
      role="button"
      onClick={() => onClick?.(id)}
      className="flex w-full items-center gap-4 rounded-xl border border-gray-200 bg-white p-4 hover:bg-gray-50"
    >
      <div className="flex w-full flex-col">
        <div className="mb-2 flex justify-between gap-2">
          <div className="flex items-center gap-2">
            <User className="h-4 w-4" />
            <div className="truncate text-sm font-semibold">{name}</div>
          </div>

          {/* <span className={`rounded-md px-2 py-0.5 text-xs ${statusCls}`}>
            {status}
          </span> */}
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
