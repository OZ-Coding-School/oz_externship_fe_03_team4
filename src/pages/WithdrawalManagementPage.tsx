import { SearchInput } from '../components/search/SearchInput'
import { useState } from 'react'
import { Badge } from '../components/Badge'
import { Table } from '../components/Data-Indicate/Table'
import { type WithdrawalRow } from '../types/withdraw/types'
import { ROLE_CODE_TO_LABEL, WITHDRAW_REASONS } from '../constants/withdrawal'
import { useDebouncedValue } from '../hooks/useDebouncedValue'
import { Accordion } from '../components/Accordion/Accordion'
import { AccordionItem } from '../components/Accordion/AccordionType'
import { WithdrawalModal } from '../components/withdrawal/WithdrawalModal'
import { formatDate } from '../utils/formatDate'
import { useWithdrawalQuery } from '../hooks/withdrawal/useWithdrawalQuery'
import { useWithdrawalDetailQuery } from '../hooks/withdrawal/useWithdrawalDetailQuery'
import { useWithdrawalRestoreMutation } from '../hooks/withdrawal/useWithdrawalRestoreMutation'
import { Pagination } from '../components/pagination/Pagination'

const ROLE_LABEL_TO_CODE: Record<string, keyof typeof ROLE_CODE_TO_LABEL> = {
  관리자: 'admin',
  스태프: 'staff',
  일반회원: 'user',
}

export const WithdrawalManagementPage = () => {
  const [search, setSearch] = useState('')
  const [withdrawReasonFilter, setWithdrawReasonFilter] = useState('')
  const [withdrawRoleFilter, setWithdrawRoleFilter] = useState('')

  const [page, setPage] = useState(1)
  const [reasonAccordion, setReasonAccordion] = useState<string>('')
  const [roleAccordion, setRoleAccordion] = useState<string>('')

  // 탈퇴 관리 모달 상태
  const [selectedWithdrawUser, setSelectedWithdrawUser] =
    useState<WithdrawalRow | null>(null)
  const [isWithdrawModalOpen, setIsWithdrawModalOpen] = useState(false)
  // const [isWithdrawEditing, setIsWithdrawEditing] = useState(false)

  // 유저 클릭시 모달 열기
  const handleWithdrawRowClick = (user: WithdrawalRow) => {
    setSelectedWithdrawUser(user)
    setIsWithdrawModalOpen(true)
    // setIsWithdrawEditing(false) // 이 부분은 추후에 API가 나오면 주석 푸는걸로 하겠습니다.
  }

  // const rows = MOCK_WITHDRAWAL_LIST_DERIVED

  const debouncedSearch = useDebouncedValue(search, 300)

  const pageSize = 10

  const { data, isLoading, error } = useWithdrawalQuery({
    page,
    limit: 10,
    keyword: debouncedSearch,
    reason: withdrawReasonFilter || undefined,
  })

  const rows = data?.result ?? []

  const filteredWithdrawUsers = rows.filter((user: WithdrawalRow) => {
    if (!withdrawRoleFilter) return true
    const targetCode = ROLE_LABEL_TO_CODE[withdrawRoleFilter]
    return user.role === targetCode
  })

  const filteredCount = filteredWithdrawUsers.length
  const baseCount = data?.count ?? 0
  const totalCount = withdrawRoleFilter ? filteredCount : baseCount
  const totalPages = Math.max(1, Math.ceil(totalCount / pageSize))

  // 테이블 컬럼 정의
  const columns = [
    { key: 'id', label: '요청 ID' },
    { key: 'email', label: '이메일' },
    { key: 'name', label: '이름' },
    {
      key: 'role',
      label: '권한',
      render: (value: unknown) => {
        const v = value as WithdrawalRow['role']
        const variant: 'info' | 'primary' | 'default' =
          v === 'admin' ? 'info' : v === 'staff' ? 'primary' : 'default'
        return <Badge variant={variant} label={v} />
      },
    },
    { key: 'birthday', label: '생년월일' },
    { key: 'reason', label: '탈퇴 사유' },
    {
      key: 'created_at',
      label: '탈퇴일시',
      render: (value: unknown) => {
        const v = value as WithdrawalRow['created_at']
        return <span>{formatDate(v)}</span>
      },
    },
  ]

  const selectedUserId = selectedWithdrawUser?.id

  const {
    data: withdrawalDetail,
    isLoading: detailLoading,
    error: detailError,
  } = useWithdrawalDetailQuery({
    userId: selectedUserId,
    enabled: isWithdrawModalOpen,
  })

  const restoreMutation = useWithdrawalRestoreMutation()

  const handleRestore = () => {
    if (!selectedUserId) return

    return restoreMutation.mutateAsync(selectedUserId).then(() => {
      setSelectedWithdrawUser(null)
      // setIsWithdrawModalOpen(false) <-- 여기서 닫지 마세요!
    })
  }

  return (
    <main className="bg-gray-50 p-8">
      <h1 className="mb-6 text-2xl font-semibold">탈퇴 관리</h1>

      {/* 검색 / 필터 */}
      <div className="mb-6 flex flex-col items-start gap-4 rounded-lg border border-gray-200 bg-white p-4 sm:flex-row sm:items-center">
        <div className="max-w-full min-w-[200px] flex-1">
          <SearchInput
            placeholder="탈퇴요청 ID, 이메일, 이름 검색..."
            value={search}
            onChangeText={setSearch}
            clearable
            className="w-full"
          />
        </div>

        <div className="relative w-40">
          <Accordion
            value={reasonAccordion}
            onValueChange={setReasonAccordion}
            selectedLabels={{ '0': withdrawReasonFilter || '전체 탈퇴 사유' }}
          >
            <AccordionItem title="탈퇴 사유">
              {reasonAccordion === '0' && (
                <div className="absolute top-full right-0 left-0 z-20 mt-2 max-h-80 overflow-auto rounded-lg border bg-white p-3 shadow-lg">
                  <button
                    className="w-full px-3 py-2 text-left text-sm hover:bg-gray-50"
                    onClick={() => {
                      setWithdrawReasonFilter('')
                      setReasonAccordion('')
                    }}
                  >
                    전체 탈퇴 사유
                  </button>
                  {WITHDRAW_REASONS.map((reason) => (
                    <button
                      key={reason}
                      className={`w-full px-3 py-2 text-left text-sm ${withdrawReasonFilter === reason ? 'bg-blue-50 font-medium text-blue-700' : 'hover:bg-gray-50'}`}
                      onClick={() => {
                        setWithdrawReasonFilter(reason)
                        setReasonAccordion('')
                      }}
                    >
                      {reason}
                    </button>
                  ))}
                </div>
              )}
            </AccordionItem>
          </Accordion>
        </div>

        <div className="relative w-40">
          <Accordion
            value={roleAccordion}
            onValueChange={setRoleAccordion}
            selectedLabels={{ '0': withdrawRoleFilter || '전체 권한' }} // ✅ 라벨 그대로 사용
          >
            <AccordionItem title="권한">
              {roleAccordion === '0' && (
                <div className="absolute top-full right-0 left-0 z-20 mt-2 max-h-80 overflow-auto rounded-lg border bg-white p-3 shadow-lg">
                  <button
                    className="w-full px-3 py-2 text-left text-sm hover:bg-gray-50"
                    onClick={() => {
                      setWithdrawRoleFilter('')
                      setRoleAccordion('')
                    }}
                  >
                    전체 권한
                  </button>
                  {Object.entries(ROLE_CODE_TO_LABEL).map(([code, label]) => (
                    <button
                      key={code}
                      className={`w-full px-3 py-2 text-left text-sm ${withdrawRoleFilter === label
                        ? 'bg-blue-50 font-medium text-blue-700'
                        : 'hover:bg-gray-50'
                        }`}
                      onClick={() => {
                        setWithdrawRoleFilter(label) // ✅ 라벨 저장
                        setRoleAccordion('')
                      }}
                    >
                      {label}
                    </button>
                  ))}
                </div>
              )}
            </AccordionItem>
          </Accordion>
        </div>
      </div>

      <div className="rounded-lg border border-gray-200 bg-white shadow-sm">
        {isLoading ? (
          <div className="p-6 text-center text-sm text-gray-500">
            불러오는 중…
          </div>
        ) : error ? (
          <div className="bg-red-50 p-6 text-sm text-red-700">
            {' '}
            {error instanceof Error ? error.message : '데이터 로드 실패'}{' '}
          </div>
        ) : (
          <Table<WithdrawalRow>
            data={filteredWithdrawUsers}
            columns={columns}
            onRowClick={handleWithdrawRowClick}
          />
        )}
      </div>

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
          error={detailError instanceof Error ? detailError.message : undefined}
          onClose={() => setIsWithdrawModalOpen(false)}
          onRestore={handleRestore}
        />
      )}
    </main>
  )
}
