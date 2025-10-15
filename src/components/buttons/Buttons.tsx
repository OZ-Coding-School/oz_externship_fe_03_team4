import * as React from 'react'

/**
 * 버튼의 색상 테마를 정의
 * @property primary   파란색(#2563EB)
 *
 */
type ButtonColor =
  | 'primary'
  | 'secondary'
  | 'success'
  | 'danger'
  | 'warning'
  | 'other' // "blue" | "white" | "green" | "red" | "yellow" | "gray"

/**
 * 버튼의 크기를 정의합니다.
 * @property small   12px 폰트, 24px 높이
 * @property medium  14px 폰트, 36px 높이
 * @property large   16px 폰트, 48px 높이
 */
type ButtonSize = 'small' | 'medium' | 'large' // "small" | "medium" | "large"

/**
 * Button 컴포넌트의 props 정의
 */
export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  /** 색상 테마 (기본값: primary) */
  color?: ButtonColor // 기본: blue 배경

  /** 크기 (small/medium/large), 지정하지 않으면 기본 38px 버튼 */
  size?: ButtonSize // small(12px)/medium(14px)/large(16px)

  /** 왼쪽 아이콘 (아이콘+텍스트 구성 시 사용) */
  leftIcon?: React.ReactNode

  /** 오른쪽 아이콘 (아이콘+텍스트 구성 시 사용) */
  rightIcon?: React.ReactNode

  /** 아이콘 전용 버튼 여부 (정사각형 38×38) */
  iconOnly?: boolean

  /** 로딩 상태 여부 */
  loading?: boolean

  /** 버튼을 부모 너비에 맞게 확장 (w-full) */
  fullWidth?: boolean
}

/**
 * 여러 개의 className을 조건부로 합쳐주는 유틸 함수입니다.
 * falsy 값(false, null, undefined)은 자동으로 제거됩니다.
 */
function mergeClassNames(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(' ')
}

/**
 * 색상 테마에 따른 기본 스타일과 포커스 링 색상을 반환합니다.
 * @param color 버튼 색상 테마
 * @returns { base, ring } Tailwind 클래스 세트
 */
function colorClasses(color: ButtonColor = 'primary'): {
  base: string
  ring: string
} {
  switch (color) {
    case 'secondary':
      return {
        base: 'bg-white text-[#374151] border border-[#D1D5DB] hover:bg-gray-50',
        ring: 'focus-visible:ring-gray-300',
      }
    case 'success':
      return {
        base: 'bg-[#16A34A] text-white hover:brightness-95 active:brightness-90',
        ring: 'focus-visible:ring-green-300',
      }
    case 'danger':
      return {
        base: 'bg-[#DC2626] text-white hover:brightness-95 active:brightness-90',
        ring: 'focus-visible:ring-red-300',
      }
    case 'warning':
      return {
        base: 'bg-[#EAB308] text-white hover:brightness-95 active:brightness-90',
        ring: 'focus-visible:ring-yellow-300',
      }
    case 'other':
      return {
        base: 'bg-[#6B7280] text-white hover:brightness-95 active:brightness-90',
        ring: 'focus-visible:ring-gray-300',
      }
    default: // primary
      return {
        base: 'bg-[#2563EB] text-white hover:brightness-95 active:brightness-90',
        ring: 'focus-visible:ring-blue-300',
      }
  }
}

/**
 * 버튼의 크기(size)에 따라 패딩, 높이, 라운드, 폰트 크기를 결정합니다.
 * @param size small / medium / large
 * @returns Tailwind 클래스 문자열
 */
function sizeClasses(size?: ButtonSize) {
  // 스펙: size가 주어지면 고정값 사용
  // small: 8x4, h-24, r-4, text-12
  // medium: 16x8, h-36, r-8, text-14
  // large: 24x12, h-48, r-8, text-16
  switch (size) {
    case 'small':
      return 'px-2 py-1 h-6 rounded text-xs'
    case 'medium':
      return 'px-4 py-2 h-9 rounded-lg text-sm'
    case 'large':
      return 'px-6 py-3 h-12 rounded-lg text-base'
    default:
      // 기본 버튼 스펙(아이콘+텍스트도 동일 기본값): 16x8, h-38, r-8, text-14
      return 'px-4 py-2 h-[38px] rounded-lg text-sm'
  }
}

/**
 * 아이콘 전용 버튼 레이아웃 클래스
 * - 크기: 38×38px
 * - 패딩: 8px
 * - 라운드: 8px
 * - 중앙 정렬
 */
const iconOnlyClasses =
  'w-[38px] h-[38px] p-2 rounded-lg inline-flex items-center justify-center'

/**
 * Button 컴포넌트
 *
 * - 기본 폰트: Roboto, font-medium
 * - 기본 높이: 38px
 * - 색상별 테마(color)
 * - 크기별 패딩/폰트/라운드(size)
 * - 아이콘 전용(iconOnly), 로딩(loading), 전체너비(fullWidth) 등 다양한 상태 지원
 *
 * @example
 * <Button color="primary" size="medium">기본 버튼</Button>
 * <Button color="secondary" leftIcon={<SearchIcon />}>검색</Button>
 * <Button iconOnly leftIcon={<HeartIcon />} aria-label="좋아요" />
 */
export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      color = 'primary',
      size,
      leftIcon,
      rightIcon,
      iconOnly = false,
      loading = false,
      fullWidth = false,
      disabled,
      className,
      children,
      ...props
    },
    ref
  ) => {
    const c = colorClasses(color)
    const isDisabled = disabled || loading

    const baseLayout = iconOnly
      ? iconOnlyClasses
      : mergeClassNames(
          'inline-flex items-center justify-center gap-2', // gap-2 = 8px
          sizeClasses(size)
        )

    return (
      <button
        ref={ref}
        type="button"
        aria-busy={loading || undefined}
        disabled={isDisabled}
        className={mergeClassNames(
          'font-medium transition-[filter,background-color,border-color] duration-150 select-none',
          'focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none',
          c.base,
          c.ring,
          baseLayout,
          fullWidth && 'w-full',
          isDisabled && 'pointer-events-none opacity-50',
          className
        )}
        {...props}
      >
        {/* 로딩 스피너(간단한 예시) */}
        {loading && (
          <span
            className="inline-block animate-spin"
            aria-hidden="true"
            style={{
              width: 16,
              height: 16,
              borderRadius: '9999px',
              border: '2px solid currentColor',
              borderRightColor: 'transparent',
            }}
          />
        )}

        {!iconOnly && leftIcon ? (
          <span className="inline-flex items-center">{leftIcon}</span>
        ) : null}

        {!iconOnly && (
          <span className="inline-flex items-center">{children}</span>
        )}

        {!iconOnly && rightIcon ? (
          <span className="inline-flex items-center">{rightIcon}</span>
        ) : null}

        {iconOnly && (leftIcon || rightIcon) ? (
          <span className="inline-flex items-center">
            {leftIcon ?? rightIcon}
          </span>
        ) : null}
      </button>
    )
  }
)

Button.displayName = 'Button'
