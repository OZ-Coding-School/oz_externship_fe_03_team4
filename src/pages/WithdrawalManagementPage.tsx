import { Select } from '../components/FormUI'
import { SearchInput } from '../components/search/SearchInput'
import { useState } from 'react'

export const WithdrawalManagementPage = () => {
  const [search, setSearch] = useState('')
  const [withdrawReasonFilter, setWithdrawReasonFilter] = useState('')
  const [withdrawRoleFilter, setWithdrawRoleFilter] = useState('')

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
              <option value="">전체</option>
              <option value="">서비스 불만족</option>
              <option value="">개인정보 우려</option>
              <option value="">사용 빈도 낮음</option>
              <option value="">경쟁 서비스 이용</option>
              <option value="">기타</option>
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
      </main>
    </div>
  )
}
