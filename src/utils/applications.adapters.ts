// buildDetailSkeleton : Application → ApplicationDetail 임시 변환 함수
// - 추후 API 연동 시 placeholderData로 대체할 예정입니닷!
import type { Application, ApplicationDetail } from '../types/applications'

export const buildDetailSkeleton = (row: Application): ApplicationDetail => ({
  ...row,
  selfIntroduction: '',
  motivation: '',
  objective: '',
  availableTime: '',
  hasStudyExperience: false,
  studyExperience: '',
  recruitment: {
    id: 0,
    title: row.postingTitle,
    expectedHeadcount: 0,
    courses: [],
    tags: [],
    deadline: '',
  },
  applicantExtra: {
    id: 0,
    gender: null,
    profileImage: null,
  },
})
