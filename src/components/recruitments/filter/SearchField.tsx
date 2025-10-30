import { SearchInput } from '../../search/SearchInput'

interface SearchFieldProps {
  value: string
  onChange: (nextValue: string) => void
  placeholder?: string
  className?: string
  inputClassName?: string
}

export const SearchField = ({
  value,
  onChange,
  placeholder,
  className,
  inputClassName,
}: SearchFieldProps) => {
  return (
    <div className={className}>
      <SearchInput
        value={value}
        onChangeText={onChange}
        placeholder={placeholder ?? '검색어를 입력해주세요.'}
        className={`w-full ${inputClassName ?? ''}`}
        clearable
      />
    </div>
  )
}
