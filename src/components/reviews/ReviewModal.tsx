import Modal from '../modal/Modal'
import { ModalFooter, ModalHeader, ReviewModalOutlet } from './components'
import type { ReviewDetail } from '../../types/reviews/types'

interface ReviewModalProps {
  open: boolean
  onClose: () => void
  review: ReviewDetail
}

export const ReviewModal = ({ open, onClose, review }: ReviewModalProps) => {
  return (
    <Modal isOn={open} onBackgroundClick={onClose}>
      <ModalHeader title="리뷰 상세보기" onClose={onClose} />
      <ReviewModalOutlet review={review} />
      <ModalFooter onClose={onClose} />
    </Modal>
  )
}
