import Modal from '../modal/Modal'
import { ModalHeader } from '../modal/ModalHeader'
import { WithdrawalModalOutlet } from './WithdrawalModalOutlet'
import { WithdrawalModalFooter } from './WithdrawalModalFooter'
import type { WithdrawalDetail } from '../../types/withdraw/types'
import { ToastContainer } from '../toast/toastContainer'
import { UserX } from 'lucide-react'
import { useBodyScrollLock } from '../../hooks/useBodyScrollLock'

type Props = {
  open: boolean
  detail?: WithdrawalDetail | null
  loading?: boolean
  error?: string
  isRestored?: boolean
  onClose: () => void
  onRestore?: () => void | Promise<void>
}

export const WithdrawalModal = ({
  open,
  detail,
  loading,
  error,
  isRestored = false,
  onClose,
  onRestore,
}: Props) => {
  useBodyScrollLock(open)

  return (
    <Modal isOn={open} onBackgroundClick={onClose}>
      <div className="flex max-h-[70vh] w-[700px] flex-col p-6">
        <ToastContainer />
        <ModalHeader
          title="회원 탈퇴 상세 정보"
          onClose={onClose}
          subtitle="WITHDRAWAL DETAIL"
          iconComponent={UserX}
        />

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

        <WithdrawalModalFooter
          onClose={onClose}
          onRestore={onRestore}
          isRestored={isRestored}
        />
      </div>
    </Modal>
  )
}
