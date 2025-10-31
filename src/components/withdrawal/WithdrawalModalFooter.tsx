export const WithdrawalModalFooter = ({ onClose }: { onClose: () => void }) => {
  return (
    <div className="mt-6 flex justify-end gap-2">
      <button
        type="button"
        className="rounded-md border border-gray-300 px-3 py-2 text-sm text-gray-700 hover:bg-gray-50"
        onClick={onClose}
      >
        닫기
      </button>
      {/* 필요 시 확정/취소 등의 액션 버튼을 여기에 추가 */}
    </div>
  )
}
