import { useMemo, useState } from 'react'
import { SearchInput } from './SearchInput'
import { useDebouncedValue } from '../../hooks/useDebouncedValue'

export const LocalFilterExample = () => {
  const [searchText, setSearchText] = useState('')
  const debouncedSearchText = useDebouncedValue(searchText, 300)

  const members = [
    { id: 1, name: '윤경복', email: 'bok@naver.com' },
    { id: 2, name: '서단비', email: 'danbi-seo@naver.com' },
    { id: 3, name: '김현진', email: 'hyunjin@naver.com' },
    { id: 4, name: '홍엽', email: 'justin-hong@naver.com' },
    { id: 5, name: '이원희', email: 'wonhee@naver.com' },
  ]

  const filteredMembers = useMemo(() => {
    const keyword = debouncedSearchText.trim().toLowerCase()
    if (!keyword) return members
    return members.filter((member) =>
      [member.name, member.email].some((field) =>
        field.toLowerCase().includes(keyword)
      )
    )
  }, [debouncedSearchText])

  return (
    <div className="mx-auto max-w-xl space-y-4 p-6">
      <SearchInput
        size="sm" // 높이 사이즈 지정 가능 "sm|md|lg"
        placeholder="이름 또는 이메일 검색"
        value={searchText}
        onChangeText={setSearchText}
        onSubmit={(submittedValue) => setSearchText(submittedValue)}
        className="w-60" // 너비 지정 가능 "w-60, 지정안되면 w-full"
      />

      <ul className="divide-y rounded-lg border">
        {filteredMembers.map((member) => (
          <li key={member.id} className="p-3">
            <div className="font-medium">{member.name}</div>
            <div className="text-sm text-neutral-500">{member.email}</div>
          </li>
        ))}
        {filteredMembers.length === 0 && (
          <li className="p-6 text-sm text-neutral-500">검색 결과 없다네~</li>
        )}
      </ul>
    </div>
  )
}
