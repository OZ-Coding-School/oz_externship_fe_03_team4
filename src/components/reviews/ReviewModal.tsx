import Modal from '../modal/Modal'
import {
  ReviewModalFooter,
  ReviewModalHeader,
  ReviewModalOutlet,
} from './components'
import type { ReviewDetail } from '../../types/reviews/types'

interface ReviewModalProps {
  open: boolean
  onClose: () => void
  review: ReviewDetail
}

export const ReviewModal = ({ open, onClose, review }: ReviewModalProps) => {
  return (
    <Modal isOn={open} onBackgroundClick={onClose}>
      <ReviewModalHeader title="리뷰 상세보기" onClose={onClose} />
      <ReviewModalOutlet review={review} />
      <ReviewModalFooter onClose={onClose} />
    </Modal>
  )
}
