// 닫기버튼만 제공하는 푸터입니당~
import { cn } from '../../utils/cn'
import { Button } from '../buttons/Buttons'

interface CloseModalFooterProps {
  onClose: () => void
  onConfirm?: () => void
  confirmLabel?: string
  confirmMode?: boolean
  className?: string
  onDelete?: () => void
  showDelete?: boolean
}

export const CloseModalFooter = ({
  onClose,
  onConfirm,
  confirmLabel = '적용하기',
  confirmMode = false,
  className,
  onDelete,
  showDelete = false,
}: CloseModalFooterProps) => {
  return (
    <footer
      className={cn(
        'mt-8 grid grid-cols-[auto_1fr_auto] items-center gap-2 border-t border-neutral-200 p-4',
        className
      )}
    >
      {showDelete ? (
        <Button
          size="medium"
          onClick={onDelete}
          className="bg-red-500 text-white hover:bg-red-600 focus-visible:ring-red-300 active:bg-red-700"
        >
          공고 삭제
        </Button>
      ) : null}
      <div /> {/* 여백입니닷 */}
      <Button
        size="medium"
        onClick={onClose}
        className="bg-gray-400 text-white hover:bg-gray-600 focus-visible:ring-gray-300 active:bg-gray-500"
      >
        닫기
      </Button>
    </footer>
  )
}
