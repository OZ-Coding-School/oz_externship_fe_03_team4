import { ToastContainer } from '../../components/toast/toastContainer'
import { useToastStore } from '../../store/toastStore'

export default function ToastTest() {
  const { showSuccess, showError, showWarning, showInfo } = useToastStore()

  return (
    <div className="h-full w-full">
      <ToastContainer />

      <div className="flex flex-col">
        <h1>Toast 테스트</h1>

        <div className="flex flex-col gap-10">
          <button
            className="bg-gray cursor-pointer"
            onClick={() =>
              showSuccess('성공', '작업이 성공적으로 완료되었습니다.')
            }
          >
            Success
          </button>

          <button
            className="bg-gray cursor-pointer"
            onClick={() => showError('오류', '오류가 발생했습니다.')}
          >
            Error
          </button>

          <button
            className="bg-gray cursor-pointer"
            onClick={() => showWarning('경고', '주의가 필요한 상황입니다.')}
          >
            Warning
          </button>

          <button
            className="bg-gray cursor-pointer"
            onClick={() => showInfo('정보', '정보 메시지입니다.')}
          >
            Info
          </button>
        </div>
      </div>
    </div>
  )
}
