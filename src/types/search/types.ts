import type { ReactNode, InputHTMLAttributes } from 'react'

export type Size = 'sm' | 'md' | 'lg'

export const sizePresets: Record<
  Size,
  { h: string; text: string; px: string; icon: string }
> = {
  sm: { h: 'h-9', text: 'text-sm', px: 'pl-9 pr-9', icon: 'h-4 w-4' },
  md: { h: 'h-11', text: 'text-base', px: 'pl-10 pr-10', icon: 'h-5 w-5' },
  lg: { h: 'h-12', text: 'text-base', px: 'pl-12 pr-12', icon: 'h-5 w-5' },
}

export type BaseInputProps = {
  value?: string
  defaultValue?: string
  placeholder?: string
  leftIcon?: ReactNode
  disabled?: boolean
  fullWidth?: boolean
  size?: Size
  clearable?: boolean
  className?: string
  inputProps?: Omit<
    InputHTMLAttributes<HTMLInputElement>,
    'value' | 'defaultValue' | 'onChange'
  >
}
