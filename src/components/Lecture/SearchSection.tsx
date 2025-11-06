import { SearchInput } from '../search/SearchInput'

interface SearchSectionProps {
  searchKeyword: string
  onSearchChange: (keyword: string) => void
  totalCount: number
  isLoading: boolean
}

export const SearchSection = ({
  searchKeyword,
  onSearchChange,
  totalCount,
  isLoading,
}: SearchSectionProps) => (
  <div className="my-6 space-y-4 rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
    <div>
      <label className="mb-2 block text-sm font-medium text-gray-700">
        검색
      </label>
      <SearchInput
        placeholder="강의명, 강사명 검색..."
        value={searchKeyword}
        onChangeText={onSearchChange}
        clearable
      />
    </div>

    {!isLoading && (
      <div className="text-sm text-gray-600">
        총 <span className="font-semibold text-gray-900">{totalCount}</span>
        개의 강의
      </div>
    )}
  </div>
)
