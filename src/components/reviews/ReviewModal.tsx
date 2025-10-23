import Modal from '../modal/Modal'
import type { ReviewDetail } from '../../types/reviews/types'
import { ModalHeader } from '../modal/ModalHeader'
import { ModalFooter } from './ModalFooter'
import { ReviewModalOutlet } from './ReviewModalOutlet'

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
