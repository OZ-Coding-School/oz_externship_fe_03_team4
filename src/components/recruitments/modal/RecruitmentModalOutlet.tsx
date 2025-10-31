import { ExternalLink } from 'lucide-react'
import {
  mapRecruitmentDetailDTO,
  mapRecruitmentDTO,
  type RecruitmentDetail,
} from '../../../types/recruitments'
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
    <div className="max-h-[78vh] overflow-y-auto p-1">
      <h2 className="mb-5 text-lg font-semibold text-neutral-900">
        스터디 구인 공고 상세 정보
      </h2>

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-[420px,1fr]">
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
        </section>
      </div>
    </div>
  )
}
