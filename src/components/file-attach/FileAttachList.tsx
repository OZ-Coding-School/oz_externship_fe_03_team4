// 공고 첨부파일 import 하실 때는 이 파일을 import 하시면 됩니다.
import { FileAttach } from './FileAttach'

type FileItem = string | { url: string; name?: string }

export const FileAttachList = ({ files = [] as FileItem[] }) => {
  if (!files.length) {
    return (
      <div className="w-full">
        <div className="mb-3 text-sm">공고 첨부 파일</div>
        <div className="text-sm text-gray-400">첨부 파일이 없습니다.</div>
      </div>
    )
  }

  return (
    <div className="w-full">
      <div className="mb-3 text-sm">공고 첨부 파일</div>
      <div className="flex flex-col gap-2">
        {files.map((f, i) => {
          const url = typeof f === 'string' ? f : f.url
          const name = typeof f === 'string' ? undefined : f.name
          return <FileAttach key={`${url}-${i}`} href={url} name={name} />
        })}
      </div>
    </div>
  )
}
