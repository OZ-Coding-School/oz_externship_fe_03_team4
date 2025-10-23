export type CategoryDTO = {
  id: number
  name: string
}

export type LectureDTO = {
  uuid: string
  title: string
  instructor: string
  thumbnail_img_url: string
  categories: CategoryDTO[]
  difficulty: 'EASY' | 'NORMAL' | 'HARD'
  original_price: number
  discount_price: number
  platform: 'inflearn' | 'udemy'
  average_rating: number
  url_link: string
  is_bookmarked: boolean
  created_at: string
  updated_at: string
}

export type Lecture = {
  id: string
  thumbnail: string
  title: string
  instructor: string
  platform: 'Udemy' | 'Inflearn'
  categories: string[]
  difficulty: '쉬움' | '보통' | '어려움'
  originalPrice: number
  discountPrice: number
  rating: number
  isBookmarked: boolean
  createdAt: string
  updatedAt: string
}

export type LectureListResponse = {
  count: number
  next: string | null
  previous: string | null
  results: LectureDTO[]
  user_nickname: string
  recommended_lectures: LectureDTO[]
}

// api 응답을 ui상 타입으로 변환
export const mapLectureDTO = (dto: LectureDTO): Lecture => ({
  id: dto.uuid,
  thumbnail: dto.thumbnail_img_url,
  title: dto.title,
  instructor: dto.instructor,
  platform: dto.platform === 'inflearn' ? 'Inflearn' : 'Udemy',
  categories: dto.categories.map((cat) => cat.name),
  difficulty:
    dto.difficulty === 'EASY'
      ? '쉬움'
      : dto.difficulty === 'NORMAL'
        ? '보통'
        : '어려움',
  originalPrice: dto.original_price,
  discountPrice: dto.discount_price,
  rating: dto.average_rating,
  isBookmarked: dto.is_bookmarked,
  createdAt: dto.created_at,
  updatedAt: dto.updated_at,
})
