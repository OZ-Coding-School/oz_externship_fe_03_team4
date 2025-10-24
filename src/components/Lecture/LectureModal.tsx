import { LectureDetail } from '../../types/lectureManagement/types'
import Modal from '../modal/Modal'
import { ModalHeader } from '../modal/ModalHeader'

interface LectureModalProps {
  open: boolean
  onClose: () => void
  lecture: LectureDetail
}

export const LectureModal = ({ open, onClose, lecture }: LectureModalProps) => {
  return (
    <Modal isOn={open} onBackgroundClick={onClose}>
      <ModalHeader title="강의 상세 정보" onClose={onClose} />
    </Modal>
  )
}
