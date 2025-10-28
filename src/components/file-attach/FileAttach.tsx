import { FileText } from 'lucide-react'
import { type AttachmentFile } from '../../types/fileattach'
import { getFileNameFromHref } from '../../utils/getFileNameFromHref'

export const FileAttach = ({ file_name, file_url }: AttachmentFile) => {
  const isHttp = /^https?:\/\//i.test(file_url)
  const fileName = isHttp
    ? (file_name ?? getFileNameFromHref(file_url))
    : '잘못된 파일명입니다'
  const isInvalid = !isHttp || fileName === '잘못된 파일명입니다'

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (isInvalid) {
      e.preventDefault() // ❌ 잘못된 파일은 다운로드 차단
      alert('잘못된 파일명입니다. 다운로드 할 수 없습니다.')
    }
  }

  return (
    <a
      href={file_url}
      download={!isInvalid}
      onClick={handleClick}
      className={`flex items-center gap-2 rounded-lg p-3 transition-colors ${
        isInvalid
          ? 'cursor-not-allowed bg-red-50 text-red-600 hover:bg-red-100'
          : 'bg-gray-50 text-gray-800 hover:bg-gray-100'
      }`}
      title={fileName}
    >
      <FileText className="h-4 w-4 text-gray-600" />
      <span className="truncate text-sm text-gray-800">{fileName}</span>
    </a>
  )
}
