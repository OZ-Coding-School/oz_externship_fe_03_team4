import { useState } from 'react'
import { type WithdrawalRow } from '../types/withdraw/types'
import { ROLE_CODE_TO_LABEL } from '../constants/withdrawal'
import { useDebouncedValue } from '../hooks/useDebouncedValue'
import { WithdrawalModal } from '../components/withdrawal/WithdrawalModal'
import { useWithdrawalQuery } from '../hooks/withdrawal/useWithdrawalQuery'
import { useWithdrawalDetailQuery } from '../hooks/withdrawal/useWithdrawalDetailQuery'
import { useWithdrawalRestoreMutation } from '../hooks/withdrawal/useWithdrawalRestoreMutation'
import { Pagination } from '../components/pagination/Pagination'
import axios from 'axios'
import { UserX } from 'lucide-react'
import { PageHeader } from '../components/PageHeader'
import { WithdrawalSearchAndFilterSection } from '../components/withdrawal/WithdrawalSearchAndFilterSection'
import { WithdrawalTable } from '../components/withdrawal/WithdrawalTable'

const ROLE_LABEL_TO_CODE: Record<string, keyof typeof ROLE_CODE_TO_LABEL> = {
  관리자: 'admin',
  스태프: 'staff',
  일반회원: 'user',
}

type SortKey = 'id' | '-id' | 'name' | '-name' | 'created_at' | '-created_at'

const WithdrawalManagementPage = () => {
  const [search, setSearch] = useState('')
  const [withdrawReasonFilter, setWithdrawReasonFilter] = useState('')
  const [withdrawRoleFilter, setWithdrawRoleFilter] = useState('')

  const [page, setPage] = useState(1)
  const [isRestored, setIsRestored] = useState(false)

  const [sortKey, setSortKey] = useState<SortKey>('id')

  const toggleSort = (target: 'id' | 'name' | 'created_at') => {
    setSortKey((current) => {
      if (current === target) return `-${target}` as SortKey // 오름 → 내림
      if (current === `-${target}`) return target as SortKey // 내림 → 오름
      return target as SortKey // 다른 컬럼 클릭 시 오름
    })
  }

  // 탈퇴 관리 모달 상태
  const [selectedWithdrawUser, setSelectedWithdrawUser] =
    useState<WithdrawalRow | null>(null)
  const [isWithdrawModalOpen, setIsWithdrawModalOpen] = useState(false)

  // 유저 클릭시 모달 열기
  const handleWithdrawRowClick = (user: WithdrawalRow) => {
    setSelectedWithdrawUser(user)
    setIsWithdrawModalOpen(true)
  }

  const debouncedSearch = useDebouncedValue(search, 300)

  const pageSize = 10

  const roleCode = withdrawRoleFilter
    ? ROLE_LABEL_TO_CODE[withdrawRoleFilter]
    : undefined

  const { data, isLoading, error } = useWithdrawalQuery({
    page,
    page_size: pageSize,
    keyword: debouncedSearch,
    role: roleCode,
    ordering: sortKey,
  })

  const rows = data?.results ?? []
  const totalPages = Math.max(1, Math.ceil((data?.count ?? 0) / pageSize))

  const getErrorMessage = (err: unknown): string => {
    if (axios.isAxiosError(err)) {
      const payload = err.response?.data

      if (typeof payload === 'object' && payload !== null) {
        const errorData = payload as {
          error?: string
          detail?: string
          message?: string
        }
        if (errorData.error) return errorData.error
        if (errorData.detail) return errorData.detail
        if (errorData.message) return errorData.message
      }

      // Axios 에러 메시지는 사용하지 않고 기본 메시지 반환
      return '데이터를 불러오는데 실패했습니다.'
    }
    if (err instanceof Error) return err.message
    return '데이터 로드 실패'
  }

  const selectedUserId = selectedWithdrawUser?.id

  const {
    data: withdrawalDetail,
    isLoading: detailLoading,
    error: detailError,
  } = useWithdrawalDetailQuery({
    withdrawal_id: selectedUserId,
    enabled: isWithdrawModalOpen && !isRestored,
  })

  const listErrorMessage = error ? getErrorMessage(error) : undefined
  const detailErrorMessage = detailError
    ? getErrorMessage(detailError)
    : undefined

  const restoreMutation = useWithdrawalRestoreMutation()

  const handleRestore = async () => {
    if (!selectedUserId) return Promise.resolve()

    return restoreMutation.mutateAsync(selectedUserId).then(() => {
      setIsRestored(true)
    })
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <PageHeader
        iconComponent={UserX}
        koreanTitle="탈퇴 관리"
        englishSubtitle="Withdrawal Management"
      />

      {/* 검색 / 필터 */}
      <WithdrawalSearchAndFilterSection
        search={search}
        onSearchChange={setSearch}
        withdrawReasonFilter={withdrawReasonFilter}
        onReasonFilterChange={setWithdrawReasonFilter}
        withdrawRoleFilter={withdrawRoleFilter}
        onRoleFilterChange={setWithdrawRoleFilter}
      />

      <WithdrawalTable
        data={rows}
        isLoading={isLoading}
        error={listErrorMessage}
        sortKey={sortKey}
        onSortChange={toggleSort}
        onRowClick={handleWithdrawRowClick}
      />

      <div className="mt-6 flex justify-center">
        <Pagination
          currentPage={page}
          totalPages={totalPages}
          onPageChange={setPage}
        />
      </div>

      {/* 모달 */}
      {selectedWithdrawUser && (
        <WithdrawalModal
          open={isWithdrawModalOpen}
          detail={withdrawalDetail ?? null}
          loading={detailLoading}
          error={detailErrorMessage}
          isRestored={isRestored}
          onClose={() => {
            setIsWithdrawModalOpen(false)
            setIsRestored(false)
            setSelectedWithdrawUser(null)
          }}
          onRestore={handleRestore}
        />
      )}
    </div>
  )
}

export default WithdrawalManagementPage
