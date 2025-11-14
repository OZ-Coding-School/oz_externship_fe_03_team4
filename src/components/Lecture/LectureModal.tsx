import { CloseModalFooter } from '../modal/CloseModalFooter'
import Modal from '../modal/Modal'
import { ModalHeader } from '../modal/ModalHeader'
import { LectureModalOutlet } from '../Lecture/LectureModalOutlet'
import { BookOpen } from 'lucide-react'
import { useLectureDetailQuery } from '../../hooks/Lecture/useLectureDetailQuery'
import { ErrorState, LoadingState } from './LoadingState'

interface LectureModalProps {
  open: boolean
  onClose: () => void
  lectureId: number | null
  className?: string
}

export const LectureModal = ({
  open,
  onClose,
  lectureId,
}: LectureModalProps) => {
  const {
    data: lecture,
    isLoading,
    isError,
    error,
  } = useLectureDetailQuery(lectureId)

  return (
    <Modal isOn={open} onBackgroundClick={onClose}>
      <ModalHeader
        title="강의 상세 정보"
        onClose={onClose}
        subtitle="LECTURE DETAIL"
        iconComponent={BookOpen}
      />

      <div className="p-6">
        {isLoading && <LoadingState message="강의 정보를 불러오는 중..." />}

        {isError && (
          <ErrorState
            title="강의 정보를 불러올 수 없습니다"
            message={error?.message || '잠시 후 다시 시도해주세요'}
          />
        )}

        {lecture && !isLoading && !isError && (
          <LectureModalOutlet lecture={lecture} />
        )}
      </div>

      <CloseModalFooter onClose={onClose} />
    </Modal>
  )
}
