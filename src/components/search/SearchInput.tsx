import { forwardRef, useImperativeHandle, useRef, useState } from 'react'
import { X, Search as SearchIcon } from 'lucide-react'
import { cn } from '../../utils/cn'
import { sizePresets, type BaseInputProps } from '../../types/search/types'

export type SearchInputRef = { focus: () => void; clear: () => void }

export type SearchInputProps = BaseInputProps & {
  onChangeText?: (value: string) => void
  onSubmit?: (value: string) => void
}

export const SearchInput = forwardRef<SearchInputRef, SearchInputProps>(
  function SearchInput(
    {
      value,
      defaultValue,
      placeholder,
      leftIcon = <SearchIcon />,
      disabled,
      fullWidth = true,
      size = 'md',
      clearable = true,
      className,
      inputProps,
      onChangeText,
      onSubmit,
    },
    forwardedRef
  ) {
    const isControlledInput = value !== undefined
    const [uncontrolledValue, setUncontrolledValue] = useState(
      defaultValue ?? ''
    )
    const currentValue = isControlledInput
      ? (value as string)
      : uncontrolledValue

    const inputElementRef = useRef<HTMLInputElement>(null)
    const sizePreset = sizePresets[size]

    useImperativeHandle(forwardedRef, () => ({
      focus: () => inputElementRef.current?.focus(),
      clear: () => handleClear(),
    }))

    function setValue(nextValue: string) {
      if (!isControlledInput) setUncontrolledValue(nextValue)
      onChangeText?.(nextValue)
    }

    function handleClear() {
      setValue('')
      inputElementRef.current?.focus()
    }

    return (
      <div className={cn(fullWidth && 'w-full', className)}>
        <div
          className={cn(
            'relative flex items-center rounded-xl border border-black/10 bg-white transition',
            'focus-within:border-black/20 focus-within:ring-4 focus-within:ring-black/5',
            sizePreset.h
          )}
        >
          {/* 아이콘 */}
          {leftIcon && (
            <div className="absolute left-3 flex items-center justify-center text-neutral-400">
              {leftIcon}
            </div>
          )}

          {/* 입력 필드 */}
          <input
            ref={inputElementRef}
            value={currentValue}
            onChange={(event) => setValue(event.target.value)}
            onKeyDown={(event) => {
              if (event.key === 'Enter') onSubmit?.(currentValue)
            }}
            disabled={disabled}
            placeholder={placeholder}
            className={cn(
              'w-full bg-transparent outline-none placeholder:text-neutral-400',
              sizePreset.text,
              leftIcon ? 'pl-10' : 'pl-4',
              clearable ? 'pr-10' : 'pr-4'
            )}
            {...inputProps}
          />

          {/* 초기화 */}
          {clearable && !!currentValue && !disabled && (
            <button
              type="button"
              aria-label="입력 지우기"
              onClick={handleClear}
              className="absolute right-2 rounded-md p-1.5 hover:bg-neutral-100 active:scale-95"
            >
              <X className={cn(sizePreset.icon, 'text-neutral-500')} />
            </button>
          )}
        </div>
      </div>
    )
  }
)
