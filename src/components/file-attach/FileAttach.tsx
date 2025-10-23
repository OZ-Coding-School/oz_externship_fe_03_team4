import { FileText } from 'lucide-react'

type FileAttachProps = {
  href: string
  name?: string
}

function getFileNameFromHref(href: string) {
  try {
    const url = new URL(href, window.location.origin)
    const last = url.pathname.split('/').filter(Boolean).pop() || ''
    return decodeURIComponent(last)
  } catch {
    const last = href.split('/').filter(Boolean).pop() || ''
    return decodeURIComponent(last)
  }
}

export const FileAttach = ({ href, name }: FileAttachProps) => {
  const fileName = name || getFileNameFromHref(href)

  return (
    <a
      href={href}
      download
      className="flex items-center gap-2 rounded-lg bg-gray-50 p-3 transition-colors hover:bg-gray-100"
      title={fileName}
    >
      <FileText className="h-4 w-4 text-gray-600" />
      <span className="text-sm text-gray-800">{fileName}</span>
    </a>
  )
}
