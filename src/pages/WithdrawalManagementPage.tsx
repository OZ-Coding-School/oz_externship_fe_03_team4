import { Select } from '../components/FormUI'
import { SearchInput } from '../components/search/SearchInput'
import { useState } from 'react'
import { Badge } from '../components/Badge'
import { Table } from '../components/Data-Indicate/Table'
import { type WithdrawalRow } from '../types/withdraw/types'

export const WithdrawalManagementPage = () => {
  const [search, setSearch] = useState('')
  const [withdrawReasonFilter, setWithdrawReasonFilter] = useState('')
  const [withdrawRoleFilter, setWithdrawRoleFilter] = useState('')

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

  // 탈퇴 유저 필터링
  const filtererWithdrawUsers = rows.filter((user) => {
    const matchesWithdrawSearch =
      search === '' ||
      user.id.includes(search) ||
      user.email.includes(search) ||
      user.name.includes(search)

    const matchesWithdrawReason =
      withdrawReasonFilter === '' ||
      (withdrawReasonFilter === '서비스 불만족' &&
        user.reason === '서비스 불만족') ||
      (withdrawReasonFilter === '개인정보 우려' &&
        user.reason === '개인정보 우려') ||
      (withdrawReasonFilter === '사용 빈도 낮음' &&
        user.reason === '사용 빈도 낮음') ||
      (withdrawReasonFilter === '경쟁 서비스 이용' &&
        user.reason === '경쟁 서비스 이용') ||
      (withdrawReasonFilter === '기타' && user.reason === '기타')

    const matchedWithdrawRole =
      withdrawRoleFilter === '' ||
      (withdrawRoleFilter === 'admin' && user.role === '관리자') ||
      (withdrawRoleFilter === 'staff' && user.role === '스태프') ||
      (withdrawRoleFilter === 'user' && user.role === '일반회원')

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
    <div className="flex min-h-screen bg-gray-50">
      <main className="flex-1 p-8">
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

          <div className="w-40">
            <Select
              value={withdrawReasonFilter}
              onChange={(e) => setWithdrawReasonFilter(e.target.value)}
            >
              <option value="">전체 탈퇴 사유</option>
              <option value="서비스 불만족">서비스 불만족</option>
              <option value="개인정보 우려">개인정보 우려</option>
              <option value="사용 빈도 낮음">사용 빈도 낮음</option>
              <option value="경쟁 서비스 이용">경쟁 서비스 이용</option>
              <option value="기타">기타</option>
            </Select>
          </div>

          <div className="w-40">
            <Select
              value={withdrawRoleFilter}
              onChange={(e) => setWithdrawRoleFilter(e.target.value)}
            >
              <option value="">전체 권한</option>
              <option value="admin">관리자</option>
              <option value="staff">스태프</option>
              <option value="user">일반회원</option>
            </Select>
          </div>
        </div>

        <div className="rounded-lg border border-gray-200 bg-white shadow-sm">
          <Table<WithdrawalRow>
            data={filtererWithdrawUsers}
            columns={columns}
          />
        </div>
      </main>
    </div>
  )
}
