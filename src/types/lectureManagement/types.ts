export type CategoryDTO = {
  id: number
  name: string
}

export type Difficulty = 'EASY' | 'MEDIUM' | 'HARD'

export type Platform = 'INFLEARN' | 'UDEMY' | 'FASTCAMPUS'

export type LectureDTO = {
  uuid: string
  title: string
  instructor: string
  thumbnail_img_url: string
  categories: CategoryDTO[]
  difficulty: Difficulty
  original_price: number
  discount_price: number
  platform: Platform
  average_rating: number
  url_link: string
  is_bookmarked: boolean
  created_at: string
  updated_at: string
}

// UI용
export type Lecture = {
  id: number
  uuid: string
  thumbnail: string
  title: string
  instructor: string
  platform: 'Udemy' | 'Inflearn' | 'Fastcampus'
  categories: string[]
  difficulty: '쉬움' | '보통' | '어려움'
  originalPrice: number
  discountPrice: number
  rating: number
  isBookmarked: boolean
  createdAt: string
  updatedAt: string
}

export interface LectureDetail extends Lecture {
  description: string
  duration: number
  url_link: string
}

export type LectureListResponse = {
  count: number
  next: string | null
  previous: string | null
  results: LectureDTO[]
  user_nickname: string
  recommended_lectures: LectureDTO[]
}

// 매핑 상수
export const PLATFORM_MAP: Record<
  Platform,
  'Udemy' | 'Inflearn' | 'Fastcampus'
> = {
  INFLEARN: 'Inflearn',
  UDEMY: 'Udemy',
  FASTCAMPUS: 'Fastcampus',
}

export const DIFFICULTY_MAP: Record<Difficulty, '쉬움' | '보통' | '어려움'> = {
  EASY: '쉬움',
  MEDIUM: '보통',
  HARD: '어려움',
}

// API → UI 타입으로 변환
export const mapLectureDTO = (dto: LectureDTO): Lecture => ({
  id: dto.uuid,
  thumbnail: dto.thumbnail_img_url,
  title: dto.title,
  instructor: dto.instructor,
  platform: PLATFORM_MAP[dto.platform],
  categories: dto.categories.map((category) => category.name),
  difficulty: DIFFICULTY_MAP[dto.difficulty],
  originalPrice: dto.original_price,
  discountPrice: dto.discount_price,
  rating: dto.average_rating,
  isBookmarked: dto.is_bookmarked,
  createdAt: dto.created_at,
  updatedAt: dto.updated_at,
})
