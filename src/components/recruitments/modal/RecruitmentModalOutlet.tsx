import { ExternalLink } from 'lucide-react'
import { type RecruitmentDetail } from '../../../types/recruitments'
import { ModalPair } from '../../reviews/ModalPair'
import { RecruitmentStatusBadge } from '../table/RecruitmentStatusBadge'
import { FileAttachList } from '../../file-attach/FileAttachList'
import { ApplyList } from '../../apply-list/ApplyList'

interface RecruitmentModalOutletProps {
  detail: RecruitmentDetail
}

export const RecruitmentModalOutlet = ({
  detail,
}: RecruitmentModalOutletProps) => {
  const {
    id,
    uuid,
    title,
    tags,
    status,
    viewsCount,
    bookmarksCount,
    createdAt,
    updatedAt,
    closeAt,
    expectedHeadcount,
    estimatedFee,
    attachments,
    lectures,
    applications,
    content,
  } = detail

  const attachmentFiles = attachments.map((attachment) => ({
    file_name: attachment.fileName,
    file_url: attachment.fileUrl,
  }))

  return (
    <div className="scrollbar-hide max-h-[78vh] overflow-y-auto p-1">
      <div className="grid grid-cols-1 items-start gap-8 sm:grid-cols-2">
        <section className="space-y-4">
          <ModalPair label="공고 ID" value={`#${id}`} />
          <ModalPair
            label="UUID"
            value={
              <span className="block font-mono text-xs break-all">{uuid}</span>
            }
          />
          <ModalPair label="공고 제목" value={title} />
          <div className="grid grid-cols-2 gap-4">
            <ModalPair
              label="예상 모집 인원"
              value={`${expectedHeadcount}명`}
            />
            <ModalPair
              label="예상 결제 비용"
              value={`${Number(estimatedFee).toLocaleString()}원`}
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <ModalPair label="마감 기한" value={closeAt} />
            <ModalPair
              label="공고 상태"
              value={<RecruitmentStatusBadge status={status} />}
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <ModalPair label="조회수" value={viewsCount.toLocaleString()} />
            <ModalPair
              label="북마크 수"
              value={bookmarksCount.toLocaleString()}
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <ModalPair label="등록일시" value={createdAt} />
            <ModalPair label="마지막 수정일시" value={updatedAt ?? '-'} />
          </div>
          <div>
            <div className="mb-2 text-sm font-semibold text-neutral-700">
              사용자 정의 태그
            </div>
            <div className="min-h-[44px] rounded-md border border-neutral-200 bg-white p-2">
              {tags.length > 0 ? (
                <div className="flex flex-wrap gap-2">
                  {tags.map((tagLabel) => (
                    <span
                      key={tagLabel}
                      className="inline-flex items-center rounded-full border border-neutral-200 bg-neutral-50 px-2 py-0.5 text-[11px] font-medium text-neutral-700"
                    >
                      {tagLabel}
                    </span>
                  ))}
                </div>
              ) : (
                <p className="text-sm text-neutral-500">태그가 없습니다.</p>
              )}
            </div>
          </div>

          <FileAttachList files={attachmentFiles} />
        </section>
        <section className="flex min-w-0 flex-col gap-6">
          <div>
            <div className="mb-2 text-sm font-semibold text-neutral-800">
              공고 내용
            </div>
            {/* 마크다운 쓴다고 해서 넣었어유~ */}
            <div
              className="prose prose-sm max-w-none rounded-lg border border-neutral-200 bg-white p-4"
              dangerouslySetInnerHTML={{
                __html:
                  content && content.trim().length > 0
                    ? content
                    : '<p class="text-neutral-500">내용이 없습니다.</p>',
              }}
            />
          </div>
          <div>
            <div className="mb-3 text-sm font-semibold text-neutral-900">
              스터디 강의 목록
            </div>
            <div className="space-y-3">
              {lectures.length > 0 ? (
                lectures.map((lectureItem, lectureIndex) => (
                  <div
                    key={`${lectureItem.title}-${lectureIndex}`}
                    className="flex items-start gap-3 rounded-lg border border-neutral-200 bg-white p-4"
                  >
                    <div className="h-20 w-28 flex-shrink-0 overflow-hidden rounded border border-neutral-200 bg-neutral-100">
                      <img
                        src={lectureItem.thumbnail}
                        alt={lectureItem.title}
                        className="h-full w-full object-cover"
                      />
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="text-[15px] font-semibold text-neutral-900">
                        {lectureItem.title}
                      </p>
                      <p className="mt-1 text-[13px] text-neutral-600">
                        강사: {lectureItem.instructor}
                      </p>
                      {lectureItem.link && (
                        <a
                          href={lectureItem.link}
                          target="_blank"
                          rel="noreferrer"
                          className="mt-2 inline-flex items-center gap-1 text-[12px] text-amber-600 hover:underline"
                        >
                          강의 바로가기 <ExternalLink size={12} />
                        </a>
                      )}
                    </div>
                  </div>
                ))
              ) : (
                <div className="rounded-lg border border-dashed border-neutral-200 p-6 text-center text-sm text-neutral-500">
                  연결된 강의가 없습니다.
                </div>
              )}
            </div>
          </div>
          <ApplyList applications={applications} />
        </section>
      </div>
    </div>
  )
}
