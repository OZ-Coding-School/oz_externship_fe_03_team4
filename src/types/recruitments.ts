export type RecruitmentStatusApi = '모집중' | '마감'    // API에서 내려오는 값
export type RecruitmentOrderingApi = 'latest' | 'oldest' | 'views' | 'bookmarks'    // 정렬 키값

// 서버 응답
export interface RecruitmentDTO {
    id: number
    title: string
    tags: string[]
    close_at: string
    status: RecruitmentStatusApi
    views_count: number
    bookmarks_count: number
    created_at: string
    updated_at: string | null
}
