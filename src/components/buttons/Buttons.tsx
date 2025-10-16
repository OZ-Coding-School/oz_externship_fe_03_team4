// src/components/buttons/Buttons.tsx
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
import {
  forwardRef,
  type CSSProperties,
  type ButtonHTMLAttributes,
  type MouseEventHandler,
  type ReactNode,
} from 'react'
import { cn } from '../../utils/cn'
import { buttonVariants } from './button.variants'
import { Spinner } from '../Spinner'

/** 버튼 색상 프리셋
 *  - (변경) other → info 로 개편
 */
export type ButtonColor =
  | 'primary'
  | 'secondary'
  | 'success'
  | 'danger'
  | 'warning'
  | 'info'

/** 버튼 크기 */
export type ButtonSize = 'small' | 'medium' | 'large'

/**
 * Button Props
 *
 * 프리셋이 충분하지 않은 경우, custom*로 자유롭게 덮어쓸 수 있습니다.
 * - customBgColor: 임의 배경색 (예: "#FF69B4" | "rgb(...)" | "hsl(...)")
 * - customTextColor: 임의 텍스트(아이콘 stroke) 색 — Lucide는 currentColor 상속
 * - customBorderColor: 임의 테두리색 — 지정 시 1px solid 자동 적용
 * - customRingColor: 포커스 링 클래스 직접 지정 (예: "focus-visible:ring-pink-300")
 *
 * 사이즈/치수:
 * - size: 패딩/라운드/폰트 결정
 * - customHeight: 높이를 px/문자열로 지정하면 h-* 클래스는 제거되고 inline-style 우선
 * - customWidth: 가로 폭 커스텀 (iconOnly + customHeight만 주면 정사각 자동 보정)
 */
export type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  color?: ButtonColor
  size?: ButtonSize

  customBgColor?: string
  customTextColor?: string
  customBorderColor?: string
  customRingColor?: string

  customHeight?: number | string
  customWidth?: number | string

  leftIcon?: ReactNode
  rightIcon?: ReactNode
  iconOnly?: boolean
  loading?: boolean
  fullWidth?: boolean
}

/** 안전 클릭 래핑:
 *  - 로딩/비활성화 상태에서는 onClick을 무시
 */
const useSafeClick = (
  onClick?: MouseEventHandler<HTMLButtonElement>,
  blocked?: boolean
) =>
  ((e) => {
    if (blocked) return
    onClick?.(e)
  }) as MouseEventHandler<HTMLButtonElement>

/** 치수 스타일 합성:
 *  - customHeight/Width를 inline-style로 주입
 *  - iconOnly + customHeight → 정사각(width = height) 자동 보정(커스텀 width 있으면 우선)
 */
const resolveDimensionStyle = (opts: {
  customHeight?: number | string
  customWidth?: number | string
  iconOnly?: boolean
}): CSSProperties => {
  const { customHeight, customWidth, iconOnly } = opts
  const style: CSSProperties = {}

  const hasHeight = customHeight !== undefined && customHeight !== null
  if (hasHeight) {
    style.height =
      typeof customHeight === 'number' ? `${customHeight}px` : customHeight
    if (iconOnly) {
      style.width =
        customWidth ??
        (typeof customHeight === 'number'
          ? `${customHeight}px`
          : (customHeight as string))
    } else if (customWidth) {
      style.width =
        typeof customWidth === 'number' ? `${customWidth}px` : customWidth
    }
  } else if (customWidth) {
    style.width =
      typeof customWidth === 'number' ? `${customWidth}px` : customWidth
  }

  return style
}

/**
 * Button
 * - preset 또는 custom 스타일을 적용하여 다양한 디자인을 수용
 * - size(패딩/라운드/폰트) + compoundVariants(높이) + iconOnly 레이아웃
 * - customHeight가 있으면 noHeight=true로 h-클래스를 제거
 */
export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (props, ref) => {
    const {
      color = 'primary',
      size,
      customBgColor,
      customTextColor,
      customBorderColor,
      customRingColor,

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
      ...rest
    } = props

    const isDisabled = disabled || loading
    const noHeight = customHeight !== undefined && customHeight !== null

    // 커스텀 색상: inline-style 우선 적용
    const customColorStyle: CSSProperties | undefined =
      customBgColor || customTextColor || customBorderColor
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

    // 치수 스타일
    const dimensionStyle = resolveDimensionStyle({
      customHeight,
      customWidth,
      iconOnly,
    })
    const finalStyle = { ...style, ...customColorStyle, ...dimensionStyle }

    // 클래스: cva + 옵션 합성 (custom 색상일 때도 hover/active는 동일하게 유지됨)
    const classes = cn(
      buttonVariants({
        color,
        size: size ?? 'default',
        iconOnly,
        noHeight,
        fullWidth,
        disabled: !!isDisabled,
      }),
      // 커스텀 링 클래스가 주어지면 추가, 아니면 color 프리셋에 포함된 링 사용
      customRingColor,
      // 🔧 외부에서 넘긴 className은 최종 우선순위
      className
    )

    const handleClick = useSafeClick(onClick, isDisabled)

    return (
      <button
        ref={ref}
        type="button"
        aria-busy={loading || undefined}
        disabled={isDisabled}
        onClick={handleClick}
        style={finalStyle}
        className={classes}
        {...rest}
      >
        {loading && <Spinner />}

        {!iconOnly && leftIcon && (
          <span className="inline-flex items-center">{leftIcon}</span>
        )}
        {!iconOnly && (
          <span className="inline-flex items-center">{children}</span>
        )}
        {!iconOnly && rightIcon && (
          <span className="inline-flex items-center">{rightIcon}</span>
        )}

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
