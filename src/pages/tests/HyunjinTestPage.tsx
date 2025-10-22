import Popover from "../../components/overaly/Popover"
import Tooltip from "../../components/overaly/Tooltip"

export default function HyunjinTestPage() {
  return (
    <div className="flex flex-col items-center justify-center h-screen gap-10 bg-gray-50">
      <h1 className="text-2xl font-bold mb-4">Popover & Tooltip Test Page</h1>

      {/* Popover 테스트 */}
      <Popover trigger={<button className="px-4 py-2 bg-blue-600 text-white rounded">
        Popover 열기
      </button>}>
        Popover 내용입니다. 오른쪽이나 왼쪽에 표시됩니다.
      </Popover>

      {/* Tooltip 테스트 */}
      <Tooltip content="툴팁 내용입니다!" position="top">
        <button className="px-4 py-2 bg-green-600 text-white rounded">
          Tooltip 테스트
        </button>
      </Tooltip>
    </div>
  )
}
