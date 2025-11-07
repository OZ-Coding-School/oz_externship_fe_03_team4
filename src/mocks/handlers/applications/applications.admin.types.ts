export type AdminApplicationRow = {
  id: number
  recruitment_title: string
  applicant_nickname: string
  applicant_email: string
  status: 'APPLIED' | 'REVIEWING' | 'APPROVED' | 'REJECTED'
  created_at: string
  updated_at: string
}
export const VALID_APPLICATION_STATUSES = [
  'APPLIED',
  'REVIEWING',
  'APPROVED',
  'REJECTED',
] as const
export type AdminApplicationStatus = (typeof VALID_APPLICATION_STATUSES)[number]

export type SortOrder = 'asc' | 'desc'
