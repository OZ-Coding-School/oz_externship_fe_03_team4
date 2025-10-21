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

export type Review = {
    id: number
    studyTitle: string
    authorName: string
    authorEmail: string
    raring: number
    summary: string
    createdAt: string
    updatedAt: string | null
}

export const mapDtoToReview = (r: ReviewDTO): Review => ({
    id: r.id,
    studyTitle: r.study_group?.name ?? '',
    authorName: r.user?.nickname ?? '',
    authorEmail: r.user?.email ?? '',
    raring: r.star_rating,
    summary: r.content,
    createdAt: r.created_at,
    updatedAt: r.updated_at,
})



