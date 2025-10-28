// 공고 첨부파일 import 하실 때는 이 파일을 import 하시면 됩니다.
import { FileAttach } from './FileAttach'
import { type AttachmentFile } from '../../types/fileattach'

export const FileAttachList = ({ files = [] as AttachmentFile[] }) => {
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
        {files.map((file, index) => {
          const url = typeof file === 'string' ? file : file.file_url
          const name = typeof file === 'string' ? undefined : file.file_name
          return (
            <FileAttach
              key={`${url}-${index}`}
              file_name={name}
              file_url={url}
            />
          )
        })}
      </div>
    </div>
  )
}
