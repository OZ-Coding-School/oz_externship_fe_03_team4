import { cn } from '../utils/cn'
import type { PageHeaderProps } from '../types/PageHeader'

export const PageHeader = ({
  iconComponents: IconComponent,
  koreanTitle,
  englishSubtitle,
  metaContent,
  actionElements,
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
        </div>
      </div>
    </header>
  )
}
