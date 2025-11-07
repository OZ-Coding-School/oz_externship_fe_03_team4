import {
  type AdminApplicationRow,
  type AdminApplicationStatus,
  VALID_APPLICATION_STATUSES,
} from './applications.admin.types'

// 고정 목업 데이터
export const APPLICATION_ROWS: AdminApplicationRow[] = Array.from({
  length: 42,
}).map((_, index) => {
  const id = 101 + index
  const dateIndex = (index % 28) + 1
  const status: AdminApplicationStatus =
    VALID_APPLICATION_STATUSES[index % VALID_APPLICATION_STATUSES.length]

  return {
    id,
    recruitment_title: index % 2 ? '프론트엔드 개발자' : '백엔드 개발자',
    applicant_nickname: `지원자${index + 1}`,
    applicant_email: `user${index + 1}@example.com`,
    status,
    created_at: `2025-10-${String(dateIndex).padStart(2, '0')}T09:00:00Z`,
    updated_at: `2025-10-${String(dateIndex).padStart(2, '0')}T12:00:00Z`,
  }
})
