export type LectureDTO = {
  id: number
  created_at: string
  updated_at: string | null
}

export type Lecture = {
  id: string
  thumbnail: string
  title: string
  instructor: string
  platform: 'Udemy' | 'Inflearn'
  createdAt: string
  updatedAt: string
}
