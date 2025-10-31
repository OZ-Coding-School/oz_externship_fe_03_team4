import { AlertTriangle } from 'lucide-react'
import Modal from '../modal/Modal'
import RoundBox from '../modal/Roundbox'

interface LoginErrorModalProps {
  isOn: boolean
  message: string
  onClose: () => void
}

export const LoginErrorModal = ({
  isOn,
  message,
  onClose,
}: LoginErrorModalProps) => {
  return (
    <Modal isOn={isOn} onBackgroundClick={onClose}>
      <RoundBox
        padding="md"
        className="h-[230px] w-[360px] space-y-4 text-center"
      >
        <div className="flex justify-center">
          <AlertTriangle
            className="text-amber-500"
            size={80}
            strokeWidth={2.2}
          />
        </div>
        <p className="text-lg whitespace-pre-line text-neutral-800">
          {message}
        </p>
        <button
          onClick={onClose}
          className="rounded-md bg-amber-500 px-4 py-2 text-sm font-medium text-white"
        >
          확인
        </button>
      </RoundBox>
    </Modal>
  )
}
