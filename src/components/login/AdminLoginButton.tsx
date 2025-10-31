import { forwardRef } from 'react'
import { Button, type ButtonProps } from '../buttons/Buttons'
import { cn } from '../../utils/cn'

type AdminLoginButtonProps = Omit<
  ButtonProps,
  'loading' | 'leftIcon' | 'rightIcon' | 'fullWidth' | 'color' | 'size'
> & {
  full?: boolean
  isLoading?: boolean
  type?: React.ButtonHTMLAttributes<HTMLButtonElement>['type']
}

export const AdminLoginButton = forwardRef<
  HTMLButtonElement,
  AdminLoginButtonProps
>(
  (
    {
      className,
      children,
      full,
      isLoading = false,
      disabled,
      type: buttonType,
      ...rest
    },
    ref
  ) => {
    return (
      <Button
        ref={ref}
        type={buttonType ?? 'submit'}
        loading={isLoading}
        fullWidth={!!full}
        disabled={disabled || isLoading}
        aria-busy={isLoading || undefined}
        className={cn(
          'h-13 rounded-lg bg-amber-500 px-5 text-xl font-semibold text-white',
          'hover:bg-amber-600 focus-visible:ring-2 focus-visible:ring-amber-500',
          'transition disabled:cursor-not-allowed disabled:opacity-50',
          full && 'w-full',
          className
        )}
        {...rest}
      >
        <span className={isLoading ? 'opacity-90' : ''}>
          {children ?? '접속하기'}
        </span>
      </Button>
    )
  }
)

AdminLoginButton.displayName = 'AdminLoginButton'
