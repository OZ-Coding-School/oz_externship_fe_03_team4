import { useState } from 'react'
import { Button } from '../buttons/Buttons'
import Modal from '../modal/Modal'
import { useToastStore } from '../../store/toastStore'

type WithdrawalModalFooterProps = {
  onClose: () => void
  onRestore?: () => void | Promise<void>
}

export const WithdrawalModalFooter = ({
  onClose,
  onRestore,
}: WithdrawalModalFooterProps) => {
  const [isRestoreOpen, setIsRestoreOpen] = useState(false)
  const [isRestoring, setIsRestoring] = useState(false)
  const { showSuccess, showError } = useToastStore()

  const handleRestoreConfirm = async () => {
    if (!onRestore) return
    setIsRestoring(true)
    try {
      showSuccess('탈퇴 회원 복구 완료', '회원 복구가 완료되었습니다.')
      await onRestore()
      setTimeout(() => {
        setIsRestoreOpen(false)
        onClose()
      }, 300) // 0.3초 뒤에 닫기
    } catch (err) {
      showError('복구 실패', '복구 중 오류가 발생했습니다.')
    } finally {
      setIsRestoring(false)
    }
  }

  return (
    <>
      <div className="mt-6 flex justify-end gap-2">
        <Button size="medium" color="secondary" onClick={onClose}>
          닫기
        </Button>
        <Button
          size="medium"
          color="success"
          onClick={() => setIsRestoreOpen(true)}
          disabled={isRestoring}
        >
          회원 복구하기
        </Button>
      </div>

      {/* 회원 복구 확인 모달 */}
      <Modal
        isOn={isRestoreOpen}
        onBackgroundClick={() => setIsRestoreOpen(false)}
      >
        <h2 className="text-lg font-bold">회원 복구 확인</h2>
        <p className="mb-6 text-base text-gray-600">
          해당 유저의 탈퇴요청은 삭제되며 해당 유저는 즉시 이용가능한 상태로
          복구됩니다.
        </p>
        <div className="flex justify-end gap-3">
          <Button
            color="secondary"
            size="medium"
            onClick={() => setIsRestoreOpen(false)}
          >
            취소
          </Button>
          <Button color="success" size="medium" onClick={handleRestoreConfirm} disabled={isRestoring}>
            복구
          </Button>
        </div>
      </Modal>
    </>
  )
}
