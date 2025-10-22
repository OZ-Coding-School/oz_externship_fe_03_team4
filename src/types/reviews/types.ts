export type ReviewStatus = 'published' | 'hidden' | 'pending' | 'flagged'

export type ReviewDTO = {
  id: number
  study_group: {
    id: number
    name: string
    start_date?: string
    end_date?: string
  }
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
  studyDescription: string // 와이어프레임에는 있는데, api명세에는 없음 -> 혁님께 요청하기
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
  ...mapDtoToReview(r), // 이미 있는 필드는 그대로 갖고옵니다.
  content: r.content,
  studyStartDate: r.study_group?.start_date ?? '',
  studyEndDate: r.study_group?.end_date ?? '',
  studyDescription: '', // 와이어프레임에는 있는데, api명세에는 없음 -> 혁님께 요청하기
})
// 헬퍼함수
export const mapReviewToDetail = (review: Review): ReviewDetail => ({
  ...review,
  content: review.summary ?? '',
  studyStartDate: '',
  studyEndDate: '',
  studyDescription: '', // 와이어프레임에는 있는데, api명세에는 없음 -> 혁님께 요청하기
})
