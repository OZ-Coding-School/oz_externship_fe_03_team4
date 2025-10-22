import { RatingStars } from '../RatingStars'
import { ReviewPair } from './ReviewPair'
import type { ReviewDetail } from '../../../types/reviews/types'

export const ReviewModalOutlet = ({ review }: { review: ReviewDetail }) => (
  <div className="gird grid-cols-1 gap-6 sm:grid-cols-2">
    {/* 좌측 스터디 그룹 정보 */}
    <section className="space-y-3">
      <h3 className="text-base font-semibold text-neutral-700">
        스터디 그룹 정보
      </h3>
      <div className="space-y-3 rounded-md border border-neutral-200 p-4">
        <ReviewPair label="스터디 그룹명" value={review.studyTitle} />

        <div className="flex gap-3">
          <ReviewPair
            label="시작일"
            value={review.studyStartDate}
            className="flex-1"
          />
          <ReviewPair
            label="종료일"
            value={review.studyEndDate}
            className="flex-1"
          />
        </div>

        <ReviewPair
          label="스터디 소개"
          value={
            <p className="whitespace-pre-line text-neutral-700">
              {review.studyDescription}
            </p>
          }
        />
      </div>
    </section>

    {/* 리뷰 정보가 출력될 부분임당 */}
    <section className="space-y-3">
      <h3 className="text-base font-semibold text-neutral-700">리뷰 정보</h3>
      <div className="space-y-3 rounded-md border border-neutral-200 p-4">
        <ReviewPair label="작성자" value={review.authorName} />
        <ReviewPair label="이메일" value={review.authorEmail} />

        <div>
          <p className="text-sm text-neutral-500">별점</p>
          <div className="flex items-center gap-2">
            <RatingStars value={review.rating} />
            <span className="text-sm text-neutral-700">
              {review.rating} / 5
            </span>
          </div>
        </div>

        <ReviewPair
          label="리뷰 내용"
          value={
            <p className="whitespace-pre-line text-neutral-700">
              {review.content}
            </p>
          }
        />

        <div className="flex gap-3 text-sm text-neutral-500">
          <p>생성일 : {review.createdAt}</p>
          <p>수정일 : {review.updatedAt}</p>
        </div>
      </div>
    </section>
  </div>
)
