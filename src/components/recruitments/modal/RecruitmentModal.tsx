import Modal from '../../modal/Modal'
import type { RecruitmentDetail } from '../../../types/recruitments'
import { ModalHeader } from '../../modal/ModalHeader'
import { RecruitmentModalOutlet } from './RecruitmentModalOutlet'
import { RecruitmentModalFooter } from './RecruitmentModalFooter'

interface RecruitmentModalProps {
  open: boolean
  onClose: () => void
  onDelete: () => void
  detail: RecruitmentDetail
}

export const RecruitmentModal = ({
  open,
  onClose,
  onDelete,
  detail,
}: RecruitmentModalProps) => {
  return (
    <Modal isOn={open} onBackgroundClick={onClose}>
      <ModalHeader title="스터디 구인 공고 상세" onClose={onClose} />
      <RecruitmentModalOutlet detail={detail} />
      <RecruitmentModalFooter onClose={onClose} onDelete={onDelete} />
    </Modal>
  )
}
