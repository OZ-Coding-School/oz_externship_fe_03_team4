import Modal from '../modal/Modal'
import { ModalHeader } from '../modal/ModalHeader'
import { WithdrawalModalOutlet } from './WithdrawalModalOutlet'
import { WithdrawalModalFooter } from './WithdrawalModalFooter'
import type { WithdrawalDetail } from '../../types/withdraw/types'
import { Toast } from '../toast/toastMessage'
import { useToastStore } from '../../store/toastStore'

type Props = {
  open: boolean
  detail?: WithdrawalDetail | null
  loading?: boolean
  error?: string
  onClose: () => void
  onRestore?: () => void | Promise<void>
}

export const WithdrawalModal = ({
  open,
  detail,
  loading,
  error,
  onClose,
  onRestore,
}: Props) => {
  const toasts = useToastStore((state) => state.toasts)
  const removeToast = useToastStore((state) => state.removeToast)

  return (
    <Modal isOn={open} onBackgroundClick={onClose}>
      <div className="flex max-h-[70vh] w-[700px] flex-col p-6">
        <div className="pointer-events-none absolute top-6 right-6 z-50 flex w-[320px] flex-col gap-2">
          {toasts.map((toast) => (
            <div
              key={`${toast.title}-${toast.message}-${toast.variant}`}
              className="pointer-events-auto"
            >
              <Toast {...toast} onClose={removeToast} />
            </div>
          ))}
        </div>
        <ModalHeader title="회원 탈퇴 상세 정보" onClose={onClose} />

        <div className="grow overflow-y-auto">
          {loading ? (
            <div className="p-6 text-center text-sm text-gray-500">
              불러오는 중…
            </div>
          ) : error ? (
            <div className="bg-red-50 p-6 text-sm text-red-700"> {error} </div>
          ) : detail ? (
            <WithdrawalModalOutlet detail={detail} />
          ) : (
            <div className="p-6 text-center text-sm text-gray-500">
              데이터가 없습니다.
            </div>
          )}
        </div>

        <WithdrawalModalFooter onClose={onClose} onRestore={onRestore} />
      </div>
    </Modal>
  )
}
