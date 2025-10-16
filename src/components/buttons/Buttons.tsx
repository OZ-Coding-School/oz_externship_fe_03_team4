/**
 * Button (프리셋 + 커스텀 색상 + 커스텀 높이/너비)
 *
 * - 색상: preset(primary/secondary/...) 또는 customBg/Text/Border/Ring로 덮어쓰기
 * - 크기: small/medium/large(패딩/폰트 기준), customHeight/Width로 치수 오버라이드
 * - 레이아웃: 텍스트/아이콘 조합 또는 아이콘 전용(iconOnly)
 * - 접근성: focus-visible 링, aria-busy(loading), 아이콘 전용 시 aria-label 필수
 *
 * 디자인 비규격(임의 색/높이)에 유연하게 대응하기 위한 프리젠테이셔널 컴포넌트입니다.
 */
import * as React from 'react'

/**
 * 버튼의 색상 테마(프리셋) 정의
 * - 필요 시 custom* props로 프리셋을 덮어쓸 수 있습니다.
 */
export type ButtonColor =
  | 'primary' // #2563EB
  | 'secondary' // white (text #374151, border #D1D5DB)
  | 'success' // #16A34A
  | 'danger' // #DC2626
  | 'warning' // #EAB308
  | 'other' // #6B7280

/** 버튼 크기 */
export type ButtonSize = 'small' | 'medium' | 'large'

/**
 * Button 컴포넌트 Props
 * - color 프리셋 + custom* 자유 입력형 색상을 동시에 지원
 */
export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  /** 프리셋 색상 (primary가 기본, primary/secondary/success/danger/warning/other 선택 가능) */
  color?: ButtonColor
  /** 자유 입력 배경색 (예: "#FF69B4", "rgb(...)", "hsl(...)") */
  customBgColor?: string
  /** 자유 입력 글자색 */
  customTextColor?: string
  /** 자유 입력 테두리색 (값이 있으면 자동으로 1px solid 적용) */
  customBorderColor?: string
  /** 자유 입력 포커스 링 색 (Tailwind 클래스 값 예: "focus-visible:ring-pink-300") */
  customRingColor?: string

  /** 버튼 크기 (small=12px, medium=14px, large=16px) */
  size?: ButtonSize
  /** 높이를 픽셀/문자열로 지정. 지정 시 h-* 클래스는 제거되고 inline-style이 우선합니다. */
  customHeight?: number | string
  /** 너비 커스텀. iconOnly에서 customHeight만 주면 정사각형으로 자동 보정됩니다. */
  customWidth?: number | string

  /** 아이콘 + 텍스트 (좌) */
  leftIcon?: React.ReactNode
  /** 아이콘 + 텍스트 (우) */
  rightIcon?: React.ReactNode
  /** 아이콘 전용 버튼 (정사각 38×38) */
  iconOnly?: boolean
  /** 로딩 상태 */
  loading?: boolean
  /** 가로 100% */
  fullWidth?: boolean
}

/** 클래스 병합 유틸 */
function mergeClassNames(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(' ')
}

/**
 * 프리셋 색상 클래스 세트.
 * customBg/Text/Border가 주어지면 이 프리셋은 무시됩니다(커스텀 우선).
 * 반환값:
 *  - base: 배경/텍스트/보더/호버/액티브 클래스
 *  - ring: focus-visible 링 클래스
 */
function presetColorClasses(color: ButtonColor = 'primary') {
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

/** 사이즈(패딩/높이/라운드/폰트) */
function sizeClasses(size: ButtonSize | undefined, hasCustomHeight: boolean) {
  if (hasCustomHeight) {
    switch (size) {
      case 'small':
        return 'px-2 py-1 rounded text-xs'
      case 'medium':
        return 'px-4 py-2 rounded-lg text-sm'
      case 'large':
        return 'px-6 py-3 rounded-lg text-base'
      default:
        return 'px-4 py-2 rounded-lg text-sm' // 기본 38px 규격 대신 높이 제외
    }
  }
  // 기존: 높이 포함
  switch (size) {
    case 'small':
      return 'px-2 py-1 h-6 rounded text-xs'
    case 'medium':
      return 'px-4 py-2 h-9 rounded-lg text-sm'
    case 'large':
      return 'px-6 py-3 h-12 rounded-lg text-base'
    default:
      return 'px-4 py-2 h-[38px] rounded-lg text-sm'
  }
}

/** 아이콘 전용 레이아웃. customHeight가 있으면 w/h 클래스를 제거합니다. */
function iconOnlyLayout(hasCustomHeight: boolean) {
  return hasCustomHeight
    ? 'p-2 rounded-lg inline-flex items-center justify-center'
    : 'w-[38px] h-[38px] p-2 rounded-lg inline-flex items-center justify-center'
}

/**
 * Button
 * - preset 또는 custom 스타일을 적용하여 다양한 디자인을 수용
 * - sizeClasses로 패딩/폰트 결정, 높이는 필요 시 customHeight로 오버라이드
 * - 로딩/disabled 시 클릭 방지(handleClick) 및 시각적 상태 처리
 */
export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      color = 'primary',
      customBgColor,
      customTextColor,
      customBorderColor,
      customRingColor, // Tailwind class (e.g., "focus-visible:ring-pink-300")

      size,
      customHeight,
      customWidth,

      leftIcon,
      rightIcon,
      iconOnly = false,
      loading = false,
      fullWidth = false,

      disabled,
      className,
      style,
      onClick,
      children,
      ...props
    },
    ref
  ) => {
    const isDisabled = disabled || loading
    const hasCustomHeight = customHeight !== undefined && customHeight !== null

    // 1) 레이아웃 클래스
    const baseLayout = iconOnly
      ? iconOnlyLayout(hasCustomHeight)
      : mergeClassNames(
          'inline-flex items-center justify-center gap-2',
          sizeClasses(size, hasCustomHeight)
        )

    // 2) 프리셋 or 커스텀 색상 선택
    // - custom* 값이 하나라도 있으면 preset.base 대신 inline-style을 사용합니다.
    const preset = presetColorClasses(color)
    const useCustom = Boolean(
      customBgColor || customTextColor || customBorderColor
    )

    // 3) 커스텀 색상 스타일 (inline style)
    // - backgroundColor / color / border(옵션)를 합성합니다.
    const customStyle: React.CSSProperties | undefined = useCustom
      ? {
          backgroundColor: customBgColor,
          color: customTextColor,
          ...(customBorderColor
            ? {
                borderColor: customBorderColor,
                borderWidth: 1,
                borderStyle: 'solid',
              }
            : {}),
        }
      : undefined

    // 4) 높이/너비 커스텀 주입
    // - customHeight가 있으면 h-*를 쓰지 않습니다.
    // - iconOnly + customHeight → width를 height와 동일하게 맞춰 정사각형 보장.
    // - customWidth가 있으면 그 값을 우선합니다.
    const dimensionStyle: React.CSSProperties = {}
    if (hasCustomHeight) {
      dimensionStyle.height =
        typeof customHeight === 'number' ? `${customHeight}px` : customHeight
      if (iconOnly) {
        const resolvedWidth =
          customWidth ??
          (typeof customHeight === 'number'
            ? `${customHeight}px`
            : customHeight)
        dimensionStyle.width = resolvedWidth as string
      } else if (customWidth) {
        dimensionStyle.width =
          typeof customWidth === 'number' ? `${customWidth}px` : customWidth
      }
    } else if (customWidth) {
      // 높이는 프리셋 유지, 가로만 커스텀
      dimensionStyle.width =
        typeof customWidth === 'number' ? `${customWidth}px` : customWidth
    }

    const finalStyle = { ...style, ...customStyle, ...dimensionStyle }

    // 5) 포커스 링 클래스 (커스텀 우선)
    // - customRingColor가 없으면 preset.ring을 사용합니다.
    const ringClass = customRingColor || preset.ring

    // 6) 안전한 onClick 래핑
    /** 로딩/비활성화 상태에서는 클릭을 무시하고, 전달된 onClick만 안전하게 호출합니다. */
    const handleClick: React.MouseEventHandler<HTMLButtonElement> = (e) => {
      if (isDisabled) return
      onClick?.(e)
    }

    return (
      <button
        ref={ref}
        type="button"
        aria-busy={loading || undefined}
        disabled={isDisabled}
        onClick={handleClick}
        style={finalStyle}
        className={mergeClassNames(
          'font-medium transition-[filter,background-color,border-color] duration-150 select-none',
          'focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none',
          useCustom ? 'hover:brightness-95 active:brightness-90' : preset.base, // 커스텀도 hover/active 유지
          ringClass,
          baseLayout,
          fullWidth && 'w-full',
          isDisabled && 'pointer-events-none opacity-50',
          className
        )}
        {...props}
      >
        {/* 로딩 스피너 */}
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

        {/* 아이콘 + 텍스트 */}
        {!iconOnly && leftIcon && (
          <span className="inline-flex items-center">{leftIcon}</span>
        )}
        {!iconOnly && (
          <span className="inline-flex items-center">{children}</span>
        )}
        {!iconOnly && rightIcon && (
          <span className="inline-flex items-center">{rightIcon}</span>
        )}

        {/* 아이콘 전용 */}
        {iconOnly && (leftIcon || rightIcon) && (
          <span className="inline-flex items-center">
            {leftIcon ?? rightIcon}
          </span>
        )}
      </button>
    )
  }
)

Button.displayName = 'Button'
