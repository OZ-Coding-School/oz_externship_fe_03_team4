import Modal from '../../modal/Modal'
import type { RecruitmentDetail } from '../../../types/recruitments'
import { ModalHeader } from '../../modal/ModalHeader'
import { RecruitmentModalOutlet } from './RecruitmentModalOutlet'
import { CloseModalFooter } from '../../modal/CloseModalFooter'
import { Megaphone } from 'lucide-react'
import { useBodyScrollLock } from '../../../hooks/useBodyScrollLock'
import { Megaphone } from 'lucide-react'

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
  useBodyScrollLock(open)
  return (
    <Modal isOn={open} onBackgroundClick={onClose}>
      <ModalHeader
        title="스터디 구인 공고 상세"
        onClose={onClose}
        subtitle="RECRUITMENT DETAIL"
        iconComponent={Megaphone}
      />
      <RecruitmentModalOutlet detail={detail} />
      <CloseModalFooter onClose={onClose} showDelete onDelete={onDelete} />
    </Modal>
  )
}
