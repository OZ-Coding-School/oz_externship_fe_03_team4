import { useMemo } from 'react'
import { Table } from '../Data-Indicate/Table'
import { Badge } from '../Badge'
import { type WithdrawalRow } from '../../types/withdraw/types'
import { ROLE_CODE_TO_LABEL } from '../../constants/withdrawal'
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
  // 정렬된 데이터
  const sortedData = useMemo(() => {
    const desc = sortKey.startsWith('-')
    const target = (desc ? sortKey.slice(1) : sortKey) as
      | 'id'
      | 'name'
      | 'created_at'
    const dir = desc ? -1 : 1

    return [...data].sort((a, b) => {
      if (target === 'id') {
        return (Number(a.id) - Number(b.id)) * dir
      }
      if (target === 'name') {
        return a.name.localeCompare(b.name, 'ko') * dir
      }
      return (
        (new Date(a.created_at).getTime() - new Date(b.created_at).getTime()) *
        dir
      )
    })
  }, [data, sortKey])

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
          data={sortedData}
          columns={columns}
          className="rounded-none border-t border-gray-200"
          onRowClick={onRowClick}
        />
      )}
    </div>
  )
}
