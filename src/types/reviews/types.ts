export type ReviewStatus = 'published' | 'hidden' | 'pending' | 'flagged'

export type ReviewDTO = {
  id: number
  study_group: { id: number; name: string }
  user: { id: number; nickname: string; email: string }
  star_rating: number
  content: string
  created_at: string
  updated_at: string | null
}

export type ReviewListDTO = {
  status: number
  message: string
  detail: {
    count: number
    next: string
    previous: string | null
    results: ReviewDTO[]
  }
}
// 리뷰
export type Review = {
  id: number
  studyTitle: string
  authorName: string
  authorEmail: string
  rating: number
  summary: string
  createdAt: string
  updatedAt: string | null
}

// 상세보기(모달), 리뷰에 없는 필드만 추가
export interface ReviewDetail extends Review {
  studyStartDate: string
  studyEndDate: string
  studyDescription: string
  content: string
}

export const mapDtoToReview = (r: ReviewDTO): Review => ({
  id: r.id,
  studyTitle: r.study_group?.name ?? '',
  authorName: r.user?.nickname ?? '',
  authorEmail: r.user?.email ?? '',
  rating: r.star_rating,
  summary: r.content,
  createdAt: r.created_at,
  updatedAt: r.updated_at,
})

//상세보기(모달)에 없는 부분 추가
export const mapDtoToReviewDetail = (r: ReviewDTO): ReviewDetail => ({
  ...mapDtoToReview(r),
  content: r.content,
  studyStartDate: '',
  studyEndDate: '',
  studyDescription: '',
})
