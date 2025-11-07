import { X, type LucideIcon } from 'lucide-react'
import { cn } from '../../utils/cn'

interface ModalHeaderProps {
  title: string
  subtitle?: string
  iconComponent?: LucideIcon
  onClose: () => void
  align?: 'left' | 'center'
  className?: string
}

export const ModalHeader = ({
  title,
  subtitle,
  iconComponent: IconComponent,
  onClose,
  align = 'left',
  className,
}: ModalHeaderProps) => (
  <div
    className={cn(
      'mb-6 flex items-start justify-between rounded-t-xl bg-gradient-to-r from-white via-neutral-50 to-white p-4 shadow-sm',
      align === 'center' && 'flex-col items-center text-center',
      className
    )}
  >
    <div
      className={cn(
        'flex items-center gap-3',
        align === 'center' && 'justify-center'
      )}
    >
      {IconComponent && (
        <div className="grid h-9 w-9 place-items-center rounded-lg border border-neutral-300 bg-white shadow-sm">
          <IconComponent className="h-4 w-4 text-neutral-700" />
        </div>
      )}
      <div>
        <h2 className="text-neutral text-lg font-semibold">{title}</h2>
        {subtitle && (
          <p className="text-[11px] tracking-[.15em] text-neutral-500 uppercase">
            {subtitle}
          </p>
        )}
      </div>
    </div>
    <button
      onClick={onClose}
      className="rounded-md p-1 text-neutral-500 transition hover:bg-neutral-100"
    >
      <X size={20} />
    </button>
  </div>
)
