import { cn } from '../../../utils/cn'
import { Button } from '../../buttons/Buttons'

interface RecruitmentModalFooterProps {
  onClose: () => void
  onDelete: () => void
  className?: string
  isDeleting?: boolean
  isDeleteDisabled?: boolean
}

export const RecruitmentModalFooter = ({
  onClose,
  onDelete,
  className,
  isDeleting = false,
  isDeleteDisabled = false,
}: RecruitmentModalFooterProps) => {
  return (
    <footer
      className={cn(
        'mt-8 flex items-center justify-end border-t border-neutral-200 p-4',
        className
      )}
    >
      <Button
        size="medium"
        onClick={onDelete}
        disabled={isDeleting || isDeleteDisabled}
        className={cn(
          'mr-3 bg-red-500 text-white hover:bg-red-600 focus-visible:ring-red-300 active:bg-red-500',
          (isDeleting || isDeleteDisabled) && 'cursor-not-allowed opacity-60'
        )}
      >
        {isDeleting ? '삭제 중…' : '공고 삭제'}
      </Button>

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
