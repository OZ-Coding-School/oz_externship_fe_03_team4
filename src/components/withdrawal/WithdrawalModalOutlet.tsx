import { formatDate } from '../../utils/formatDate'

export type WithdrawalDetail = {
  withdrawal_id: number
  user: {
    id: number
    name: string
    gender: string
    nickname: string
    email: string
    role: string
    status: string
    created_at: string
    profile_img_url?: string
  }
  reason: string
  reason_detail: string
  requested_at: string
  scheduled_deletion_at: string
}

export const WithdrawalModalOutlet = ({
  detail,
}: {
  detail: WithdrawalDetail
}) => {
  const user = detail.user
  return (
    <div className="space-y-4 text-sm">
      {/* 사용자 */}
      <div className="flex items-center gap-3">
        <div className="h-10 w-10 overflow-hidden rounded-full bg-gray-100">
          {user.profile_img_url ? (
            <img
              src={user.profile_img_url}
              alt={user.nickname || user.name}
              className="h-full w-full object-cover"
            />
          ) : (
            <div className="flex h-full w-full items-center justify-center text-gray-400">
              U
            </div>
          )}
        </div>
        <div className="min-w-0">
          <div className="truncate font-medium text-gray-900">
            {user.name} ({user.nickname}) · {user.email}
          </div>
          <div className="truncate text-xs text-gray-500">
            ID: {user.id} · {user.role} · {user.status} · 가입일{' '}
            {formatDate(user.created_at)}
          </div>
        </div>
      </div>

      {/* 탈퇴 상세 */}
      <div className="grid grid-cols-3 gap-2">
        <span className="text-gray-500">요청 ID</span>
        <span className="col-span-2 font-medium text-gray-900">
          {detail.withdrawal_id}
        </span>

        <span className="text-gray-500">탈퇴 사유</span>
        <span className="col-span-2 text-gray-900">{detail.reason}</span>

        <span className="text-gray-500">상세 사유</span>
        <span className="col-span-2 text-gray-900">{detail.reason_detail}</span>

        <span className="text-gray-500">요청 일시</span>
        <span className="col-span-2 text-gray-900">
          {formatDate(detail.requested_at)}
        </span>

        <span className="text-gray-500">삭제 예정 일시</span>
        <span className="col-span-2 text-gray-900">
          {formatDate(detail.scheduled_deletion_at)}
        </span>
      </div>
    </div>
  )
}
