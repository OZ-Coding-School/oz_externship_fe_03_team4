import { X, type LucideIcon } from 'lucide-react'

interface ModalHeaderProps {
  title: string
  subtitle?: string
  iconComponent?: LucideIcon
  onClose: () => void
}

export const ModalHeader = ({
  title,
  subtitle,
  iconComponent: IconComponent,
  onClose,
}: ModalHeaderProps) => (
  <div className="mb-6 flex items-center justify-between">
    <div className="flex items-center gap-3">
      {IconComponent && (
        <div className="grid h-14 w-14 place-items-center rounded-lg border border-neutral-300 bg-white shadow-sm">
          <IconComponent className="h-10 w-10 text-neutral-700" />
        </div>
      )}
      <div>
        <h2 className="text-neutral text-xl font-semibold">{title}</h2>
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
