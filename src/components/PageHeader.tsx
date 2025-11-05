import { cn } from '../utils/cn'
import type { PageHeaderProps } from '../types/PageHeader'

export const PageHeader = ({
  iconComponent: IconComponent,
  koreanTitle,
  englishSubtitle,
  textAlign = 'left',
  headerSize = 'large',
  className,
  children,
}: PageHeaderProps) => {
  return (
    <header
      className={cn(
        'relative rounded-2xl border border-neutral-200 bg-neutral-50/70 shadow-sm',
        'px-5 md:px-6',
        headerSize === 'large' ? 'py-5 md:py-6' : 'py-3.5',
        className
      )}
      role="banner"
    >
      <div
        className={cn(
          'flex flex-col gap-3 md:flex-row md:items-center',
          textAlign === 'center'
            ? 'text-center md:justify-center'
            : 'md:justify-between'
        )}
      >
        <div
          className={cn(
            'flex items-center gap-3',
            textAlign === 'center' && 'md:justify-center'
          )}
        >
          {IconComponent && (
            <div className="grid h-11 w-11 place-items-center rounded-xl border border-neutral-300">
              <IconComponent className="text-neurtal-700 h-5 w-5" />
            </div>
          )}
          <div>
            <h1
              className={cn(
                'truncate font-semibold text-neutral-900',
                headerSize === 'large' ? 'text-xl md:text-2xl' : 'text-lg'
              )}
            >
              {koreanTitle}
            </h1>
            {englishSubtitle && (
              <p className="truncate text-[11px] tracking-[.18em] text-neutral-500 uppercase md:text-xs">
                {englishSubtitle}
              </p>
            )}
          </div>
        </div>
      </div>
      <div className="pointer-events-none absolute inset-x-0 -bottom-px h-px bg-gradient-to-r from-transparent via-neutral-200 to-transparent" />
      {children}
    </header>
  )
}
