import { useMemo } from 'react'
import { Table } from '../Data-Indicate/Table'
import { Badge } from '../Badge'
import { type WithdrawalRow } from '../../types/withdraw/types'
import {
  ROLE_CODE_TO_LABEL,
  WITHDRAW_REASON_CODE_TO_LABEL,
} from '../../constants/withdrawal'
import { formatDate } from '../../utils/formatDate'
import { ArrowUpDown } from 'lucide-react'

type SortKey = 'id' | '-id' | 'name' | '-name' | 'created_at' | '-created_at'

interface WithdrawalTableProps {
  data: WithdrawalRow[]
  isLoading: boolean
  error?: string
  sortKey: SortKey
  onSortChange: (target: 'id' | 'name' | 'created_at') => void
  onRowClick: (row: WithdrawalRow) => void
}

export const WithdrawalTable = ({
  data,
  isLoading,
  error,
  sortKey,
  onSortChange,
  onRowClick,
}: WithdrawalTableProps) => {
  const columns = useMemo(
    () => [
      {
        key: 'id',
        label: (
          <button
            type="button"
            onClick={() => onSortChange('id')}
            className={`flex items-center gap-1 ${
              sortKey === 'id' || sortKey === '-id'
                ? 'text-gray-900'
                : 'text-gray-600'
            }`}
          >
            <span>요청 ID</span>
            <ArrowUpDown size={14} />
          </button>
        ),
        render: (value: unknown) => (
          <span className="block w-16 text-left text-sm font-medium">
            {String(value)}
          </span>
        ),
      },
      {
        key: 'email',
        label: <span className="block w-44 truncate text-left">이메일</span>,
        render: (value: unknown) => (
          <span className="block w-44 truncate text-left text-sm font-medium">
            {String(value)}
          </span>
        ),
      },
      {
        key: 'name',
        label: (
          <button
            type="button"
            onClick={() => onSortChange('name')}
            className={`flex items-center gap-1 ${
              sortKey === 'name' || sortKey === '-name'
                ? 'text-gray-900'
                : 'text-gray-600'
            }`}
          >
            <span>이름</span>
            <ArrowUpDown size={14} />
          </button>
        ),
        render: (value: unknown) => (
          <span className="block w-24 truncate text-left text-sm font-medium">
            {String(value)}
          </span>
        ),
      },
      {
        key: 'role',
        label: <span className="block w-10 truncate text-left">권한</span>,
        render: (value: unknown) => {
          const code = String(value) as keyof typeof ROLE_CODE_TO_LABEL
          const label = ROLE_CODE_TO_LABEL[code] ?? '일반회원'
          const variant: 'info' | 'primary' | 'default' =
            code === 'admin' ? 'info' : code === 'staff' ? 'primary' : 'default'

          return (
            <div className="w-20 text-left">
              <Badge variant={variant} label={label} />
            </div>
          )
        },
      },
      {
        key: 'birthday',
        label: <span className="block w-28 truncate text-left">생년월일</span>,
        render: (value: unknown) => (
          <span className="block w-28 text-left text-sm font-medium">
            {String(value)}
          </span>
        ),
      },
      {
        key: 'reason',
        label: <span className="block w-60 truncate text-left">탈퇴 사유</span>,
        render: (value: unknown) => {
          const code = String(value)
          const label = WITHDRAW_REASON_CODE_TO_LABEL[code] || code // ✅ 코드를 한글로 변환
          return (
            <span className="block w-60 truncate text-left text-sm font-medium">
              {label}
            </span>
          )
        },
      },
      {
        key: 'withdrawn_at',
        label: (
          <button
            type="button"
            onClick={() => onSortChange('created_at')}
            className={`flex items-center gap-1 ${
              sortKey === 'created_at' || sortKey === '-created_at'
                ? 'text-gray-900'
                : 'text-gray-600'
            }`}
          >
            <span>탈퇴일시</span>
            <ArrowUpDown size={14} />
          </button>
        ),
        render: (value: unknown) => {
          return (
            <span className="block w-36 text-left text-sm font-medium">
              {formatDate(String(value))}
            </span>
          )
        },
      },
    ],
    [onSortChange, sortKey]
  )

  return (
    <div className="rounded-lg border border-gray-200 bg-white shadow-sm">
      {isLoading ? (
        <div className="p-6 text-center text-sm text-gray-500">
          불러오는 중…
        </div>
      ) : error ? (
        <div className="bg-red-50 p-6 text-sm text-red-700">{error}</div>
      ) : (
        <Table<WithdrawalRow>
          data={data}
          columns={columns}
          className="rounded-none border-t border-gray-200"
          onRowClick={onRowClick}
        />
      )}
    </div>
  )
}
