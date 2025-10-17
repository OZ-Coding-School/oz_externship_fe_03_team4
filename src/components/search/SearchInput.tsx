import { forwardRef, useImperativeHandle, useRef, useState } from 'react'
import { X, Search as SearchIcon } from 'lucide-react'
import { cn } from '../../utils/cn'
import { sizePresets, type BaseInputProps } from '../../types/search/types'
import type { ReactNode } from 'react'

export type SearchInputRef = { focus: () => void; clear: () => void }

export type SearchInputProps = BaseInputProps & {
  onChangeText?: (value: string) => void
  onSubmit?: (value: string) => void
  label?: ReactNode
  hintText?: ReactNode
  errorMessage?: ReactNode
}

export const SearchInput = forwardRef<SearchInputRef, SearchInputProps>(
  function SearchInput(
    {
      value, // string - 입력 값
      defaultValue, // string - 초기 값
      placeholder, // string - 안내 문구
      leftIcon = <SearchIcon />, // ReactNode - 아이콘 (기본값 : 돋보기)
      disabled, // boolean - 활성/비활성 여부
      fullWidth = true, // boolean - 너비 100% 적용 여부(기본값 : true)
      size = 'md', // 'sm' | 'md' | 'lg' — 크기 프리셋 (기본값 : 'md')
      clearable = true, // boolean : 검색어삭제 버튼 표시 여부 (기본값 : true)
      className, // string | undefined - 컴포넌트에 추가할 클래스
      inputProps, // object — input에 직접 전달할 속성(id, name 등), value/defaultValue/onChange 제외
      onChangeText, // [필수값, 그 외 필수x] string — 검색어 입력 시마다 호출 (디바운스 훅 코드 추가하면 디바운스 적용 가능, 예제페이지 참고)
      onSubmit, // string — Enter 키 입력 시 현재 검색어를 인자로 호출
      label, // ReactNode — 상단 라벨
      hintText, // ReactNode — 하단 좌측에 힌트메세지
      errorMessage, // ReactNode — 하단 우측에 에러가 존재할 경우 빨간색 테두리나와유
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
        {/* 라벨 */}
        {label && (
          <label className="mb-1.5 block text-sm font-medium text-neutral-800">
            {label}
          </label>
        )}
        <div
          className={cn(
            'relative flex items-center rounded-xl border bg-white transition',
            errorMessage
              ? 'border-red-500 focus-within:ring-red-100'
              : 'border-black/10 focus-within:border-black/20 focus-within:ring-black/5',
            'focus-within:ring-4',
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
            // leftIcon 유무 : 왼쪽 패딩 결정, clearable 유무 : 오른쪽 패딩 결정
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
              aria-label="입력 삭제"
              onClick={handleClear}
              className="absolute right-2 rounded-md p-1.5 hover:bg-neutral-100 active:scale-95"
            >
              <X className={cn(sizePreset.icon, 'text-neutral-500')} />
            </button>
          )}
        </div>

        {(hintText || errorMessage) && (
          <div className="mt-1.5 flex items-center justify-between text-xs">
            {hintText && <p className="text-neutral-500">{hintText}</p>}
            {errorMessage && <p className="text-red-600">{errorMessage}</p>}
          </div>
        )}
      </div>
    )
  }
)
