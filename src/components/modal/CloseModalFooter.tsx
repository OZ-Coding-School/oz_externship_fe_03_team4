// 닫기버튼만 제공하는 푸터입니당~
import { cn } from '../../utils/cn'
import { Button } from '../buttons/Buttons'

interface CloseModalFooterProps {
  onClose: () => void
  className?: string
}

export const CloseModalFooter = ({
  onClose,
  className,
}: CloseModalFooterProps) => {
  return (
    <footer
      className={cn(
        'mt-8 flex items-center justify-end border-neutral-200 p-4',
        className
      )}
    >
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
