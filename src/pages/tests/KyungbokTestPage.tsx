import { useState } from 'react'
import { ReviewModal } from '../../components/Reviews/ReviewModal'
import { type ReviewDetail } from '../../types/reviews/types'

export default function KyungbokTestPage() {
  const [open, setOpen] = useState(false)

  const mockReview: ReviewDetail = {
    id: 42,
    studyTitle: '리액트 기초 스터디',
    studyStartDate: '2025-09-01 19:00',
    studyEndDate: '2025-10-01 21:00',
    studyDescription:
      '주 2회 진행 / 과제 리뷰 포함\n목표: 컴포넌트·훅·상태관리 기초 탄탄히 잡기',
    authorName: '김개발',
    authorEmail: 'dev@example.com',
    rating: 4,
    summary:
      '생각보다 과제가 알차고 피드백이 빠릅니다. 다만 시간대가 조금 늦어요.',
    content:
      '생각보다 과제가 알차고 피드백이 빠릅니다. 다만 시간대가 조금 늦어요.',
    createdAt: '2025-10-10 12:34',
    updatedAt: '2025-10-12 09:20',
  }

  return (
    <div className="p-6">
      <h1 className="mb-4 text-lg font-semibold">ReviewModal 테스트</h1>

      <button
        className="rounded-md border px-4 py-2 text-sm hover:bg-neutral-50"
        onClick={() => setOpen(true)}
      >
        모달 열기
      </button>

      <ReviewModal
        open={open}
        onClose={() => setOpen(false)}
        review={mockReview}
      />
    </div>
  )
}
