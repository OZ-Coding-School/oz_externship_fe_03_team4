import type { ApplicationDetail } from '../../../types/applications'
import { CloseModalFooter } from '../../modal/CloseModalFooter'
import Modal from '../../modal/Modal'
import { ModalHeader } from '../../modal/ModalHeader'
import { ApplicationModalOutlet } from './ApplicationModalOutlet'

interface ApplicationPageModalProps {
  open: boolean
  onClose: () => void
  detail: ApplicationDetail | null
}

export const ApplicationPageModal = ({
  open,
  onClose,
  detail,
}: ApplicationPageModalProps) => {
  if (!detail) return null

  return (
    <Modal isOn={open} onBackgroundClick={onClose}>
      <ModalHeader title="지원 내역 상세" onClose={onClose} />
      <div className="scrollbar-hide max-h-[60vh] overflow-y-auto px-6 py-4">
        <ApplicationModalOutlet detail={detail} />
      </div>
      <CloseModalFooter onClose={onClose} />
    </Modal>
  )
}
