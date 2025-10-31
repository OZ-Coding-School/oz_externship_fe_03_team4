import { SearchInput } from '../components/search/SearchInput'
import { useState } from 'react'
import { Badge } from '../components/Badge'
import { Table } from '../components/Data-Indicate/Table'
import { type WithdrawalRow } from '../types/withdraw/types'
import {
  ROLE_CODE_TO_LABEL,
  ROLE_LABEL_TO_CODE,
  WITHDRAW_REASONS,
} from '../constants/withdrawal'
import { useDebouncedValue } from '../hooks/useDebouncedValue'
import { Accordion } from '../components/Accordion/Accordion'
import { AccordionItem } from '../components/Accordion/AccordionType'
import Modal from '../components/modal/Modal'
import { ModalHeader } from '../components/modal/ModalHeader'
import {
  WithdrawalModalOutlet,
  // type WithdrawalDetail,
} from '../components/withdrawal/WithdrawalModalOutlet'
import { WithdrawalModalFooter } from '../components/withdrawal/WithdrawalModalFooter'
import { buildMockWithdrawalDetail } from '../components/withdrawal/mockWithdrawalDetail'

export const WithdrawalManagementPage = () => {
  const [search, setSearch] = useState('')
  const [withdrawReasonFilter, setWithdrawReasonFilter] = useState('')
  const [withdrawRoleFilter, setWithdrawRoleFilter] = useState('')

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
    // setIsWithdrawEditing(false)
  }

  const rows: WithdrawalRow[] = [
    {
      id: 'W001',
      email: 'byeuser@example.com',
      name: '김민수',
      role: '일반회원',
      birthday: '1992-09-21',
      reason: '서비스 불만족',
      created_at: '2025-10-03 14:10',
    },
    {
      id: 'W002',
      email: 'quit@example.com',
      name: '이영희',
      role: '스태프',
      birthday: '1990-07-02',
      reason: '개인정보 우려',
      created_at: '2025-10-04 09:30',
    },
    {
      id: 'W003',
      email: 'bye@example.com',
      name: '박철수',
      role: '일반회원',
      birthday: '1995-11-08',
      reason: '사용 빈도 낮음',
      created_at: '2025-10-05 12:00',
    },
  ]

  const debouncedSearch = useDebouncedValue(search, 300)

  // 탈퇴 유저 필터링
  const filteredWithdrawUsers = rows.filter((user) => {
    const matchesWithdrawSearch =
      search === '' ||
      user.id.includes(debouncedSearch) ||
      user.email.includes(debouncedSearch) ||
      user.name.includes(debouncedSearch)

    const matchesWithdrawReason =
      withdrawReasonFilter === '' || user.reason === withdrawReasonFilter

    const matchedWithdrawRole =
      withdrawRoleFilter === '' ||
      ROLE_LABEL_TO_CODE[user.role] === withdrawRoleFilter

    return matchesWithdrawSearch && matchesWithdrawReason && matchedWithdrawRole
  })

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
          v === '관리자' ? 'info' : v === '스태프' ? 'primary' : 'default'
        return <Badge variant={variant} label={v} />
      },
    },
    { key: 'birthday', label: '생년월일' },
    { key: 'reason', label: '탈퇴 사유' },
    { key: 'created_at', label: '탈퇴일시' },
  ]

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
            selectedLabels={{
              '0': withdrawRoleFilter
                ? ROLE_CODE_TO_LABEL[
                    withdrawRoleFilter as keyof typeof ROLE_CODE_TO_LABEL
                  ]
                : '전체 권한',
            }}
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
                      className={`w-full px-3 py-2 text-left text-sm ${withdrawRoleFilter === code ? 'bg-blue-50 font-medium text-blue-700' : 'hover:bg-gray-50'}`}
                      onClick={() => {
                        setWithdrawRoleFilter(code)
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
        <Table<WithdrawalRow>
          data={filteredWithdrawUsers}
          columns={columns}
          onRowClick={handleWithdrawRowClick}
        />
      </div>

      {/* 모달 */}
      {selectedWithdrawUser && (
        <Modal
          isOn={isWithdrawModalOpen}
          onBackgroundClick={() => setIsWithdrawModalOpen(false)}
        >
          <div className="w-[700px] p-6">
            <ModalHeader
              title="회원 탈퇴 상세 정보"
              onClose={() => setIsWithdrawModalOpen(false)}
            />
            <WithdrawalModalOutlet
              detail={buildMockWithdrawalDetail(selectedWithdrawUser)}
            />
            <WithdrawalModalFooter
              onClose={() => setIsWithdrawModalOpen(false)}
            />
          </div>
        </Modal>
      )}
    </main>
  )
}
