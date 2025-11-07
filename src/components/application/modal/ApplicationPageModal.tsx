import type { ApplicationDetail } from '../../../types/applications'
import { CloseModalFooter } from '../../modal/CloseModalFooter'
import Modal from '../../modal/Modal'
import { ModalHeader } from '../../modal/ModalHeader'
import { ApplicationModalOutlet } from './ApplicationModalOutlet'
import { ClipboardList } from 'lucide-react'

interface ApplicationPageModalProps {
  open: boolean
  onClose: () => void
  detail: ApplicationDetail | null // null은 렌더링 안정성 확보를 위해 유지하려고 합니당.
}

export const ApplicationPageModal = ({
  open,
  onClose,
  detail,
}: ApplicationPageModalProps) => {
  if (!detail) return null

  return (
    <Modal isOn={open} onBackgroundClick={onClose}>
      <ModalHeader
        title="지원 내역 상세"
        onClose={onClose}
        subtitle="APPLICATION detail"
        iconComponent={ClipboardList}
      />
      <ApplicationModalOutlet detail={detail} />
      <CloseModalFooter onClose={onClose} />
    </Modal>
  )
}
