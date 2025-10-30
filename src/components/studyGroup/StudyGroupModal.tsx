import type { StudyGroupDetail } from '../../types/studyGroup/types'
import { CloseModalFooter } from '../modal/CloseModalFooter'
import Modal from '../modal/Modal'
import { ModalHeader } from '../modal/ModalHeader'
import { StudyGroupModalOutlet } from './StudyGroupModalOutlet'

interface StudyGroupModalProps {
  open: boolean
  onClose: () => void
  studyGroup: StudyGroupDetail | null
  isLoading?: boolean
  className?: string
}

export const StudyGroupModal = ({
  open,
  onClose,
  studyGroup,
  isLoading = false,
}: StudyGroupModalProps) => {
  return (
    <Modal isOn={open} onBackgroundClick={onClose}>
      <ModalHeader title="스터디 그룹 상세 정보" onClose={onClose} />
      {isLoading ? (
        <div className="flex items-center justify-center p-8">
          <div className="text-center">
            <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-blue-600 border-r-transparent"></div>
            <p className="mt-4 text-sm text-gray-600">로딩 중...</p>
          </div>
        </div>
      ) : studyGroup ? (
        <StudyGroupModalOutlet studyGroup={studyGroup} />
      ) : (
        <div className="flex items-center justify-center p-8">
          <p className="text-sm text-gray-500">
            스터디 그룹 정보를 불러올 수 없습니다.
          </p>
        </div>
      )}
      <CloseModalFooter onClose={onClose} />
    </Modal>
  )
}
