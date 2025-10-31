import type { Lecture } from '../../types/lectureManagement/types'
import { CloseModalFooter } from '../modal/CloseModalFooter'
import Modal from '../modal/Modal'
import { ModalHeader } from '../modal/ModalHeader'
import { LectureModalOutlet } from '../Lecture/LectureModalOutlet'

interface LectureModalProps {
  open: boolean
  onClose: () => void
  lecture: Lecture
  className?: string
}

export const LectureModal = ({ open, onClose, lecture }: LectureModalProps) => {
  return (
    <Modal isOn={open} onBackgroundClick={onClose}>
      <ModalHeader title="강의 상세 정보" onClose={onClose} />
      <LectureModalOutlet lecture={lecture} />
      <CloseModalFooter onClose={onClose} />
    </Modal>
  )
}
