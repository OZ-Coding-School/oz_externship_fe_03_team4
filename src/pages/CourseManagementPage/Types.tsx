export type Course = {
  id: string
  thumbnail: string
  title: string
  instructor: string
  platform: 'Udemy' | 'Inflearn'
  createdAt: string
  updatedAt: string
}

// type CourseTableProps = {
//   courses: Course[]
//   onCourseClick?: (course: Course) => void
//   emptyMessage?: string
// }

// export const PLATFORM_TO_BADGE_VARIANT: Record<Course['platform'], BadgeProps> =
//   {
//     Udemy: 'info',
//     Inflearn: 'success',
//   } as const

// export const TABLE_COLUMNS = [
//   { key: 'id', label: 'ID', width: 'w-20' },
//   { key: 'thumbnail', label: '썸네일', width: 'w-24' },
//   { key: 'title', label: '강의명', width: '' },
//   { key: 'instructor', label: '강사명', width: 'w-32' },
//   { key: 'platform', label: '플랫폼', width: 'w-28' },
//   { key: 'createdAt', label: '생성일시', width: 'w-44' },
//   { key: 'updatedAt', label: '수정일시', width: 'w-44' },
// ] as const
