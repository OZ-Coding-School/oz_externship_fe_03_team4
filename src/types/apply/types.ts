export type Applicant = {
  id: string | number
  nickname: string
  email: string
  created_at: string
  status: '대기' | '검토중' | '거절' | '승인'
}

export type ApplyItemProps = {
  applicant: Applicant
}

export type ApplyListProps = {
  applicants: Applicant[]
}

// 뷰 전용 타입(지원 일시 표시용)
export type ApplicantWithDate = Applicant & { dateText: string }
