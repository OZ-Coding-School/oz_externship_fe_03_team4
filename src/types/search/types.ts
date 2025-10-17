import type { ReactNode, InputHTMLAttributes } from 'react'

export type Size = 'sm' | 'md' | 'lg'

export const sizePresets: Record<
  Size,
  { h: string; text: string; icon: string }
> = {
  sm: { h: 'h-9', text: 'text-sm', icon: 'h-4 w-4' },
  md: { h: 'h-11', text: 'text-base', icon: 'h-5 w-5' },
  lg: { h: 'h-12', text: 'text-base', icon: 'h-5 w-5' },
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
  label?: ReactNode
  hintText?: ReactNode
  errorMessage?: ReactNode
}
