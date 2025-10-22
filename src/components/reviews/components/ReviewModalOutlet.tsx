import { RatingStars } from '../RatingStars'
import { ReviewPair } from './ReviewPair'
import type { ReviewDetail } from '../../../types/reviews/types'

export const ReviewModalOutlet = ({ review }: { review: ReviewDetail }) => (
  <div className="grid grid-cols-1 gap-8 sm:grid-cols-2">
    {/* 좌측 스터디 그룹 정보 */}
    <section className="space-y-3">
      <h3 className="mb-5 text-base font-semibold text-neutral-700">
        스터디 그룹 정보
      </h3>
      <ReviewPair label="스터디 그룹명" value={review.studyTitle} />

      <div className="mb-4 grid grid-cols-1 gap-3 sm:grid-cols-2">
        <ReviewPair label="시작일" value={review.studyStartDate || '-'} />
        <ReviewPair label="종료일" value={review.studyEndDate || '-'} />
      </div>
      {/* 현재 와이어프레임에는 있는데, 백엔드 API에는 없음 : 혁님께 요청해야됨 */}
      <ReviewPair
        label="스터디 소개"
        value={review.studyDescription}
        multiline
        minHeightClass="min-h-[120px]"
      />
    </section>

    {/* 리뷰 정보가 출력될 부분임당 */}
    <section className="space-y-4">
      <h3 className="text-base font-semibold text-neutral-800">리뷰 정보</h3>
      <div className="grid grid-cols-2 gap-3">
        <ReviewPair label="작성자" value={review.authorName} />
        <ReviewPair label="이메일" value={review.authorEmail} />
      </div>

      <ReviewPair
        label="별점"
        value={
          <div className="flex items-center gap-2">
            <RatingStars value={review.rating} />
            <span className="text-sm text-neutral-700">
              {review.rating} / 5
            </span>
          </div>
        }
      />

      <ReviewPair
        label="리뷰 내용"
        value={review.content}
        multiline
        minHeightClass="min-h-[120px]"
      />

      <div className="grid grid-cols-2 gap-3 text-sm text-neutral-500">
        <ReviewPair label="생성일" value={review.createdAt} />
        <ReviewPair label="수정일" value={review.updatedAt ?? '-'} />
      </div>
    </section>
  </div>
)
