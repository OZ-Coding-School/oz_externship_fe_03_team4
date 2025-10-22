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
      <Button color="secondary" size="small" onClick={onClose}>
        닫기
      </Button>
    </footer>
  )
}
