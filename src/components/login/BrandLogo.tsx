import { cn } from '../../utils/cn'

export const BrandLogo = ({ className }: { className?: string }) => {
  return (
    <div className={cn('flex items-center gap-2 select-none', className)}>
      <span
        aria-hidden
        className={cn(
          'inline-flex h-6 w-6 items-center justify-center',
          'rounded-[6px] bg-amber-600 font-extrabold text-white',
          'leading-none shadow-[0_1px_0_rgba(0,0,0,0.4)] ring-1 ring-amber-200'
        )}
      >
        S
      </span>

      <span
        className={cn(
          'text-[30px] font-extrabold tracking-[-.0.01em]',
          'text-amber-600'
        )}
      >
        StudyHub
      </span>
    </div>
  )
}
