import { SearchInput } from '../../search/SearchInput'

export const SearchField = ({
  value,
  onChange,
}: {
  value: string
  onChange: (v: string) => void
}) => (
  <SearchInput
    value={value}
    onChangeText={(v) => onChange(v)}
    placeholder="지원자 이름 또는 이메일로 검색해 주세요."
    className="max-w-xl flex-1"
  />
)
