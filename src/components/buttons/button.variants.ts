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
          'bg-[#2563EB] text-white hover:brightness-95 active:brightness-90 focus-visible:ring-blue-300',
        /** white / text #374151 / border #D1D5DB */
        secondary:
          'bg-white text-[#374151] border border-[#D1D5DB] hover:bg-gray-50 focus-visible:ring-gray-300',
        /** #16A34A */
        success:
          'bg-[#16A34A] text-white hover:brightness-95 active:brightness-90 focus-visible:ring-green-300',
        /** #DC2626 */
        danger:
          'bg-[#DC2626] text-white hover:brightness-95 active:brightness-90 focus-visible:ring-red-300',
        /** #EAB308 */
        warning:
          'bg-[#EAB308] text-white hover:brightness-95 active:brightness-90 focus-visible:ring-yellow-300',
        /** (기존 other →) info: #6B7280 */
        info: 'bg-[#6B7280] text-white hover:brightness-95 active:brightness-90 focus-visible:ring-gray-300',
      },
      size: {
        /** 8x4 / r-4 / text-12 */
        small: 'px-2 py-1 rounded text-xs',
        /** 16x8 / r-8 / text-14 */
        medium: 'px-4 py-2 rounded-lg text-sm',
        /** 24x12 / r-8 / text-16 */
        large: 'px-6 py-3 rounded-lg text-base',
        /** 기본 38px 규격(높이는 compoundVariants에서 부여) */
        default: 'px-4 py-2 rounded-lg text-sm',
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
      // 높이 부여
      { size: 'small', class: 'h-6' },
      { size: 'medium', class: 'h-9' },
      { size: 'large', class: 'h-12' },
      { size: 'default', class: 'h-[38px]' },

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
