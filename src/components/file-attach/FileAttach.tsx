import { FileText } from 'lucide-react'
import { type AttachmentFile } from '../../types/fileattach'

// type FileAttachProps = {
//   href: string
//   name?: string
// }

// function getFileNameFromHref(href: string) {
//   try {
//     const url = new URL(href, window.location.origin)
//     const last = url.pathname.split('/').filter(Boolean).pop() || ''
//     return decodeURIComponent(last)
//   } catch {
//     // const last = href.split('/').filter(Boolean).pop() || ''
//     // return decodeURIComponent(last || 'unknown-file')
//     return 'unknown-file'
//   }
// }

function getFileNameFromHref(href: string) {
  // 1️⃣ http/https 시작 여부 체크
  const isHttp = /^https?:\/\//i.test(href)
  if (!isHttp) return '잘못된 파일명입니다'

  try {
    const url = new URL(href)
    const last = decodeURIComponent(
      url.pathname.split('/').filter(Boolean).pop() || ''
    )
    const valid =
      last.trim() !== '' &&
      (/[A-Za-z0-9가-힣]/.test(last) || last.includes('.'))
    return valid ? last : '잘못된 파일명입니다'
  } catch {
    return '잘못된 파일명입니다'
  }
}

export const FileAttach = ({ file_name, file_url }: AttachmentFile) => {
  // const fileName = file_name || getFileNameFromHref(file_url)
  // const isInvalid = fileName === '잘못된 파일명입니다'
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
      className="flex items-center gap-2 rounded-lg bg-gray-50 p-3 transition-colors hover:bg-gray-100"
      title={fileName}
    >
      <FileText className="h-4 w-4 text-gray-600" />
      <span className="truncate text-sm text-gray-800">{fileName}</span>
    </a>
  )
}
