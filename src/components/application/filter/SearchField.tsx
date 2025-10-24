import { SearchInput } from '../../search/SearchInput'

interface SearchFieldProps {
  value: string
  onChange: (v: string) => void
}

export const SearchField = ({ value, onChange }: SearchFieldProps) => (
  <SearchInput
    value={value}
    onChangeText={onChange}
    placeholder="지원자 이름 또는 이메일로 검색해주세요."
    className="max-w-xl flex-1"
  />
)
