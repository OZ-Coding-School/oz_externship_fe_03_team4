import { useEffect, useState } from 'react'
import type { ReactNode } from 'react'
import { SearchInput, type SearchInputProps } from './SearchInput'
import { useDebouncedValue } from '../../hooks/useDebouncedValue'

type SearchFieldProps = Omit<SearchInputProps, 'onChangeText'> & {
  label?: ReactNode
  hintText?: ReactNode
  errorMessage?: ReactNode
  onSearch?: (value: string) => void
  debounceMilliseconds?: number
  fieldIdentifier?: string
}

export const SearchField = ({
  label,
  hintText,
  errorMessage,
  onSearch,
  debounceMilliseconds = 250,
  fieldIdentifier = 'search',
  value,
  defaultValue,
  onSubmit,
  ...rest
}: SearchFieldProps) => {
  const [inputText, setInputText] = useState<string>(
    value ?? defaultValue ?? ''
  )
  const debouncedInputText = useDebouncedValue(inputText, debounceMilliseconds)

  useEffect(() => {
    if (value !== undefined) {
      setInputText(value)
    }
  }, [value])

  useEffect(() => {
    if (onSearch) {
      onSearch(debouncedInputText)
    }
  }, [debouncedInputText, onSearch])

  return (
    <div className="w-full space-y-1.5">
      {label && (
        <label
          htmlFor={fieldIdentifier}
          className="black text-sm font-medium text-neutral-800"
        >
          {label}
        </label>
      )}

      <SearchInput
        {...rest}
        value={inputText}
        onChangeText={setInputText}
        onSubmit={(submittedValue) => onSubmit?.(submittedValue)}
        inputProps={{ id: fieldIdentifier, ...(rest.inputProps || {}) }}
      />

      {(hintText || errorMessage) && (
        <div className="flex items-center justify-between text-xs">
          {hintText && <p className="text-neutral-500">{hintText}</p>}
          {errorMessage && <p className="text-red-600">{errorMessage}</p>}
        </div>
      )}
    </div>
  )
}
