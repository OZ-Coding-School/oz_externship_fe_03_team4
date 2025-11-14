export type ReviewStatus = 'published' | 'hidden' | 'pending' | 'flagged'

export type ReviewDTO = {
  // 서버 응답 타입 정의
  id: number
  study_group: {
    id: number
    uuid?: string
    name: string
    start_at?: string
    end_at?: string
  }
  author: { id: number; nickname: string; email: string }
  star_rating: number
  content: string
  created_at: string
  updated_at: string | null
}

export type ReviewListDTO = {
  // 서버 리뷰 목록 응답 전체 구조 정의
  count: number
  next: string | null
  previous: string | null
  results: ReviewDTO[]
}
export interface ReviewDetailResponseDTO {
  detail: ReviewDTO
}
// 클라이언트 표시용 타입 - 필드명을 카멜케이스로 맞추며, 실제 화면에서 보이는 이름으로 정리
export type Review = {
  id: number
  studyTitle: string // 스터디 그룹명
  authorName: string // 작성자 닉네임
  authorEmail: string // 작성자 이메일
  rating: number // 별점
  summary: string // 리뷰 요약
  createdAt: string // 생성일
  updatedAt: string | null // 수정일
}

// 상세보기(모달), 리뷰에 없는 필드만 추가
export interface ReviewDetail extends Review {
  uuid?: string
  studyStartDate: string
  studyEndDate: string
  studyDescription: string // 와이어프레임에는 있는데, api명세에는 없음 -> 혁님께 요청하기
  content: string
}
// 매핑 헬퍼 함수 -> 서버 응답을 프론트엔드용 리뷰 타입으로 변환
export const mapDtoToReview = (r: ReviewDTO): Review => ({
  id: r.id,
  studyTitle: r.study_group?.name ?? '',
  authorName: r.author?.nickname ?? '',
  authorEmail: r.author?.email ?? '',
  rating: r.star_rating,
  summary: r.content,
  createdAt: r.created_at,
  updatedAt: r.updated_at,
})

//상세보기(모달)에 없는 부분 추가
export const mapDtoToReviewDetail = (r: ReviewDTO): ReviewDetail => ({
  ...mapDtoToReview(r), // 이미 있는 필드는 그대로 갖고옵니다.
  uuid: r.study_group?.uuid ?? '',
  content: r.content,
  studyStartDate: r.study_group?.start_at ?? '',
  studyEndDate: r.study_group?.end_at ?? '',
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
