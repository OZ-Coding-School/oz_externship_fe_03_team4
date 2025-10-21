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
