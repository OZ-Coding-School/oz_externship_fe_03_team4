import Modal from '../modal/Modal'
import type { ReviewDetail } from '../../types/reviews/types'
import { ModalHeader } from '../modal/ModalHeader'
import { ReviewModalOutlet } from '../reviews/ReviewModalOutlet'
import { CloseModalFooter } from '../modal/CloseModalFooter'
import { Star } from 'lucide-react'
import { useBodyScrollLock } from '../../hooks/useBodyScrollLock'

interface ReviewModalProps {
  open: boolean
  onClose: () => void
  review: ReviewDetail
}

export const ReviewModal = ({ open, onClose, review }: ReviewModalProps) => {
  useBodyScrollLock(open)
  return (
    <Modal isOn={open} onBackgroundClick={onClose}>
      <ModalHeader
        title="리뷰 상세보기"
        subtitle="REVIEW DETAIL"
        iconComponent={Star}
        onClose={onClose}
      />
      <ReviewModalOutlet review={review} />
      <CloseModalFooter onClose={onClose} />
    </Modal>
  )
}
