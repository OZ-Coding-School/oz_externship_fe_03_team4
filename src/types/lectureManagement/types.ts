export type CategoryDTO = {
  id: number
  name: string
}

export type Difficulty = 'EASY' | 'MEDIUM' | 'HARD'

export type Platform = 'INFLEARN' | 'UDEMY'

export type LectureDTO = {
  id: number
  uuid: string
  title: string
  instructor: string
  description: string
  thumbnail_img_url: string
  categories: CategoryDTO[]
  difficulty: Difficulty
  original_price: number
  discount_price: number
  platform: Platform
  average_rating: number
  url_link: string
  created_at: string
  updated_at: string
  duration: number
}

// UI용
export type Lecture = {
  id: number
  uuid: string
  thumbnail: string
  title: string
  instructor: string
  description: string
  platform: 'Udemy' | 'Inflearn'
  categories: string[]
  difficulty: '쉬움' | '보통' | '어려움'
  duration: number
  originalPrice: number
  discountPrice: number
  urlLink: string
  createdAt: string
  updatedAt: string
}

export type LectureListResponse = {
  count: number
  next: string | null
  previous: string | null
  results: LectureDTO[]
  user_nickname: string
  recommended_lectures?: LectureDTO[]
}

// 매핑 상수
export const PLATFORM_MAP: Record<Platform, 'Udemy' | 'Inflearn'> = {
  INFLEARN: 'Inflearn',
  UDEMY: 'Udemy',
}

export const DIFFICULTY_MAP: Record<Difficulty, '쉬움' | '보통' | '어려움'> = {
  EASY: '쉬움',
  MEDIUM: '보통',
  HARD: '어려움',
}

// API → UI 타입으로 변환
export const mapLectureDTO = (dto: LectureDTO): Lecture => ({
  id: dto.id,
  uuid: dto.uuid,
  thumbnail: dto.thumbnail_img_url,
  title: dto.title,
  instructor: dto.instructor,
  description: dto.description,
  platform: PLATFORM_MAP[dto.platform],
  categories: (dto.categories ?? []).map((c) => c.name),
  difficulty: DIFFICULTY_MAP[dto.difficulty],
  duration: dto.duration,
  originalPrice: dto.original_price,
  discountPrice: dto.discount_price,
  urlLink: dto.url_link,
  createdAt: dto.created_at,
  updatedAt: dto.updated_at,
})
