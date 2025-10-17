import { forwardRef } from 'react'
import { motion, type MotionProps } from 'framer-motion'
import { Button, type ButtonProps } from '../buttons/Buttons'
import { Spinner } from '../Spinner'
import { cn } from '../../utils/cn'

const MotionButton = motion(Button as any)

type AdminLoginButtonProps = Omit<
  ButtonProps,
  'loading' | 'leftIcon' | 'rightIcon' | 'fullWidth' | 'type' | 'color' | 'size'
> &
  MotionProps & {
    full?: boolean
    isLoading?: boolean
  }

export const AdminLoginButton = forwardRef<
  HTMLButtonElement,
  AdminLoginButtonProps
>(
  (
    { className, children, full, isLoading = false, disabled, ...rest },
    ref
  ) => {
    return (
      <MotionButton
        ref={ref}
        type="submit"
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
        whileHover={{ scale: 1.03 }}
        whileTap={{ scale: 0.97 }}
        transition={{ duration: 0.15, ease: 'easeOut' }}
        {...rest}
      >
        {isLoading && <Spinner size={18} />}
        <span className={isLoading ? 'opacity-90' : ''}>
          {children ?? '접속하기'}
        </span>
      </MotionButton>
    )
  }
)

AdminLoginButton.displayName = 'AdminLoginButton'
