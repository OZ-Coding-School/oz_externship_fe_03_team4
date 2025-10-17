/**
 * Button Variants (class-variance-authority)
 *
 * - switch-case 없이 props 조합으로 클래스 결정
 * - color: 프리셋(링 클래스까지 포함)
 * - size: 패딩/라운드/폰트 (높이는 compoundVariants로 붙임)
 * - iconOnly: 아이콘 전용 레이아웃
 * - fullWidth/disabled: 상태 클래스
 */
import { cva, type VariantProps } from 'class-variance-authority'

export const buttonVariants = cva(
  [
    'font-medium select-none',
    'transition-[filter,background-color,border-color] duration-150',
    'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2',
    'inline-flex items-center justify-center gap-2',
  ].join(' '),
  {
    variants: {
      color: {
        /** #2563EB */
        primary:
          'bg-primary-button text-white hover:brightness-95 active:brightness-90 focus-visible:ring-primary-button-300',
        /** white / text #374151 / border #D1D5DB */
        secondary:
          'bg-secondary-button text-secondary-button-fg border border-secondary-button-border hover:bg-gray-50 focus-visible:ring-secondary-button-ring',
        /** #16A34A */
        success:
          'bg-success-button text-white hover:brightness-95 active:brightness-90 focus-visible:ring-success-button-300',
        /** #DC2626 */
        danger:
          'bg-danger-button text-white hover:brightness-95 active:brightness-90 focus-visible:ring-danger-button-300',
        /** #EAB308 */
        warning:
          'bg-warning-button text-white hover:brightness-95 active:brightness-90 focus-visible:ring-warning-button-300',
        /** (기존 other →) info: #6B7280 */
        info: 'bg-info-button text-white hover:brightness-95 active:brightness-90 focus-visible:ring-info-button-300',
      },
      size: {
        /** 폰트 크기 12px, 높이 24px, 모서리(border-radius) 4px, 좌우 패딩 8px, 상하 패딩 4px */
        small: 'h-6 px-2 py-1 rounded text-xs',
        /** 폰트 크기 14px, 높이 36px, 모서리(border-radius) 8px, 좌우 패딩 16px, 상하 패딩 8px */
        medium: 'h-9 px-4 py-2 rounded-lg text-sm',
        /** 폰트 크기 16px, 높이 48px, 모서리(border-radius) 8px, 좌우 패딩 24px, 상하 패딩 12px */
        large: 'h-12 px-6 py-3 rounded-lg text-base',
        /** 폰트 크기 14px, 높이 38px, 모서리(border-radius) 8px, 좌우 패딩 16px, 상하 패딩 8px */
        default: 'h-[38px] px-4 py-2 rounded-lg text-sm',
      },
      /** 아이콘 전용 버튼 */
      iconOnly: {
        true: '', // 높이/너비는 compoundVariants에서 제어
        false: '',
      },
      /** 보조 상태 */
      fullWidth: { true: 'w-full', false: '' },
      disabled: { true: 'opacity-50 pointer-events-none', false: '' },
    },
    compoundVariants: [
      // 아이콘 전용: 기본 정사각 38×38
      {
        iconOnly: true,
        class: 'w-[38px] h-[38px] p-2 rounded-lg',
      },
      // 아이콘 전용 + customHeight: w/h 고정 제거 (정사각은 컴포넌트에서 style로 보장)
      { iconOnly: true, class: 'p-2 rounded-lg' },
    ],
    defaultVariants: {
      color: 'primary',
      size: 'default',
      iconOnly: false,

      fullWidth: false,
      disabled: false,
    },
  }
)

export type ButtonVariantProps = VariantProps<typeof buttonVariants>
