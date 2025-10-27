import type { LectureDetail } from '../../types/lectureManagement/types'
import { CloseModalFooter } from '../modal/CloseModalFooter'
import Modal from '../modal/Modal'
import { ModalHeader } from '../modal/ModalHeader'
import { LectureModalOutlet } from '../Lecture/LectureModalOutlet'

interface LectureModalProps {
  open: boolean
  onClose: () => void
  lecture: LectureDetail
  className?: string
}

export const LectureModal = ({ open, onClose, lecture }: LectureModalProps) => {
  return (
    <Modal
      isOn={open}
      onBackgroundClick={onClose}
      style={{
        maxHeight: '90vh',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <ModalHeader title="강의 상세 정보" onClose={onClose} />
      <LectureModalOutlet lecture={lecture} />
      <CloseModalFooter onClose={onClose} />
    </Modal>
  )
}
