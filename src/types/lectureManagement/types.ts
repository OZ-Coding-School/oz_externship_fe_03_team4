import { formatDate } from '../../utils/formatDate'

export type CategoryDTO = {
  id: number
  name: string
}

export type Difficulty = 'EASY' | 'MEDIUM' | 'HARD'

export type Platform = 'INFLEARN' | 'UDEMY'

// 목록 조회용
export type LectureDTO = {
  id: number
  title: string
  instructor: string
  thumbnail_img_url: string
  platform: Platform
  url_link: string
  categories: CategoryDTO[]
  created_at: string
  updated_at: string
}

// 상세 조회 UI용
export type LectureDetailDTO = {
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

// UI용 통합 타입
export type Lecture = {
  id: number
  thumbnail: string
  title: string
  instructor: string
  platform: 'Udemy' | 'Inflearn'
  categories: string[]
  urlLink: string
  createdAt: string
  updatedAt: string
}

export type LectureDetail = {
  id: number
  uuid: string
  thumbnail: string
  title: string
  instructor: string
  description?: string
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
  // uuid: undefined,
  thumbnail: dto.thumbnail_img_url,
  title: dto.title,
  instructor: dto.instructor,
  // description: undefined,
  platform: PLATFORM_MAP[dto.platform],
  categories: (dto.categories ?? []).map((categories) => categories.name),
  // difficulty: undefined,
  // duration: undefined,
  // originalPrice: undefined,
  // discountPrice: undefined,
  urlLink: dto.url_link,
  createdAt: formatDate(dto.created_at),
  updatedAt: formatDate(dto.updated_at),
})

export const mapLectureDetail = (dto: LectureDetailDTO): LectureDetail => ({
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
  createdAt: formatDate(dto.created_at),
  updatedAt: formatDate(dto.updated_at),
})
