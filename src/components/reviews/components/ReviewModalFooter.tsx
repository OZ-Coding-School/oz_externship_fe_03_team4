import { cn } from '../../../utils/cn'
import { Button } from '../../buttons/Buttons'

interface ReviewModalFooterProps {
  onClose: () => void
  className?: string
}

export const ReviewModalFooter = ({
  onClose,
  className,
}: ReviewModalFooterProps) => {
  return (
    <footer
      className={cn(
        'mt-8 flex items-center justify-end border-t border-neutral-200 p-4',
        className
      )}
    >
      <Button
        size="medium"
        onClick={onClose}
        customBgColor="#9CA3AF"
        customTextColor="#ffffff"
        customRingColor="focus-visible:ring-gray-300"
        className="hover:bg-gray-800 active:bg-gray-200"
      >
        닫기
      </Button>
    </footer>
  )
}
