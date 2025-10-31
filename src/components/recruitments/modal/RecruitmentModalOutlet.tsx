import { ExternalLink } from "lucide-react";
import { mapRecruitmentDetailDTO, mapRecruitmentDTO, type RecruitmentDetail } from "../../../types/recruitments";
import { ModalPair } from "../../reviews/ModalPair";
import { RecruitmentStatusBadge } from "../table/RecruitmentStatusBadge";
import { FileAttachList } from "../../file-attach/FileAttachList";
import { ApplyList } from "../../apply-list/ApplyList";

interface RecruitmentModalOutletProps  {
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
            
        </div>
    )
}