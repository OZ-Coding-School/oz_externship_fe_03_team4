import { SearchInput } from '../../search/SearchInput'

interface ReviewSearchFieldProps {
  value: string
  onChange: (nextValue: string) => void
  onSubmit?: (submitted: string) => void
  className?: string
  inputClassName?: string
  placeholder?: string
}

export const ReviewSearchField = ({
  value,
  onChange,
  onSubmit,
  className,
  inputClassName,
  placeholder = '닉네임 또는 이메일로 검색',
}: ReviewSearchFieldProps) => {
  return (
    <div className={className}>
      <SearchInput
        value={value}
        onChangeText={onChange}
        onSubmit={(v) => onSubmit?.(v)}
        placeholder={placeholder}
        inputProps={{ type: 'text', enterKeyHint: 'search' }}
        className={`w-full ${inputClassName ?? ''}`}
        clearable
      />
    </div>
  )
}
