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
  if (!isOn) return null

  return (
    <Modal isOn={isOn} onBackgroundClick={onClose}>
      <RoundBox padding="md" className="w-[360px] space-y-4 text-center">
        <p className="text-sm text-neutral-800">{message}</p>
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
