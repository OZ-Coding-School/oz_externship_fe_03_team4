import { SearchInput } from '../../search/SearchInput'

interface SearchFieldProps {
  value: string
  onChange: (nextValue: string) => void
  placeholder?: string
}

export const SearchField = ({
  value,
  onChange,
  placeholder,
}: SearchFieldProps) => {
  ;<SearchInput
    value={value}
    onChangeText={onChange}
    placeholder={placeholder ?? '검색어를 입력해주세요.'}
    className="max-w-xl flex-1"
    clearable
  />
}
