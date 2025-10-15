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
type ButtonSize = 'small' | 'medium' | 'large' // "small" | "medium" | "large"

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  color?: ButtonColor // 기본: blue 배경
  size?: ButtonSize // small(12px)/medium(14px)/large(16px)
  leftIcon?: React.ReactNode // 아이콘+텍스트 (좌)
  rightIcon?: React.ReactNode // 아이콘+텍스트 (우)
  iconOnly?: boolean // 아이콘 전용 버튼(정사각 38)
  loading?: boolean // 로딩 상태
  fullWidth?: boolean // w-full
}

/** 간단 util: 공백 기준 class 병합 */
function mergeClassNames(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(' ')
}

/** 색상 변형: 텍스트/보더/hover 등 */
function colorClasses(color: ButtonColor = 'primary') {
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

/** 사이즈 변형: 패딩/높이/라운드/폰트 */
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

/** 아이콘 전용 버튼: 38x38, p-8, r-8 */
const iconOnlyClasses =
  'w-[38px] h-[38px] p-2 rounded-lg inline-flex items-center justify-center'

/**
 * Button
 * - 기본 텍스트 색: #FFFFFF (단, color=white일 때 #374151 + 1px #D1D5DB)
 * - 기본 높이: 38px (size 미지정 시)
 * - 아이콘+텍스트: leftIcon/rightIcon로 구성 (간격 8px)
 * - 아이콘 전용: iconOnly=true → 38x38 정사각
 * - 폰트: Roboto, font-medium (전역 폰트 로딩 가정)
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
