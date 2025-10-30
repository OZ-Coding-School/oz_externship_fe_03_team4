import type { ReactNode } from 'react'
import type { Recruitment } from '../../../types/recruitments'
import { RecruitmentStatusBadge } from './RecruitmentStatusBadge'
import { TagPills } from './TagPills'
import { formatDate } from '../../../utils/formatDate'

const numberFormatter = new Intl.NumberFormat('ko-KR')

export const recruitmentColumns = [
    { key: 'id' as const, label: 'ID', },
    {   key: 'title' as const, 
        label: '공고 제목',
        render: (title: string) => (
            <div className="min-w-[16rem] truncate font-medium text-neutral-900">
                {title}
            </div>
        ),
    },
    {
        key: 'tags' as const,
        label: '태그',
        render: (tags: string[]) => <TagPills tags={tags} />
    },
    {
        key: 'closeAt' as const,
        label: '마감 기한',
        render: (closeAt: string) => (
            <span className="text-[12px] text-neutral">
                {formatDate(closeAt)}
            </span>
        ),
    },
    {
        key: 'status' as const,
        label: '상태',
        render: (status: Recruitment['status']) => (
            <RecruitmentStatusBadge status={status} />
        ),
    },
    
]