import { useState } from 'react'
import { Button } from '../buttons/Buttons'
import Modal from '../modal/Modal'

type WithdrawalModalFooterProps = {
  onClose: () => void
  onRestore?: () => void | Promise<void>
}

export const WithdrawalModalFooter = ({
  onClose,
  onRestore,
}: WithdrawalModalFooterProps) => {
  const [isRestoreOpen, setIsRestoreOpen] = useState(false)
  const [isAlertOpen, setIsAlertOpen] = useState(false)

  const handleRestoreConfirm = () => {
    setIsRestoreOpen(false)
    setIsAlertOpen(true)

    onRestore?.()
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
          <Button color="success" size="medium" onClick={handleRestoreConfirm}>
            복구
          </Button>
        </div>
      </Modal>

      {/* 완료 알림 */}
      <Modal
        isOn={isAlertOpen}
        onBackgroundClick={() => setIsAlertOpen(false)}
        className="max-h-[600px] w-[400px]"
      >
        <h2 className="mb-4 text-lg font-bold">알림</h2>
        <p className="mb-6 text-base text-gray-600">
          회원 복구가 완료되었습니다.
        </p>
        <div className="flex justify-end">
          <Button
            color="success"
            size="medium"
            onClick={() => setIsAlertOpen(false)}
          >
            확인
          </Button>
        </div>
      </Modal>
    </>
  )
}
