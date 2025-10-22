import { X } from 'lucide-react'

export const ReviewModalHeader = ({
  title,
  onClose,
}: {
  title: string
  onClose: () => void
}) => (
  <div className="mb-6 flex items-center justify-between">
    <h2 className="text-neutral text-lg font-semibold">{title}</h2>
    <button
      onClick={onClose}
      className="rounded-md p-1 text-neutral-500 transition hover:bg-neutral-100"
    >
      <X size={20} />
    </button>
  </div>
)
