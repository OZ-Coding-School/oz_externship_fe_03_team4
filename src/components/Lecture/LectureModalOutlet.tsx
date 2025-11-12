import type { LectureDetail } from '../../types/lectureManagement/types'
import { Badge } from '../Badge'
import { ModalPair } from '../reviews/ModalPair'
import { PlatformBadge } from '../Lecture/PlatformBadge'
import { formatDuration } from '../../utils/formatDuration'

interface LectureModalOutletProps {
  lecture: LectureDetail
}

export const LectureModalOutlet = ({ lecture }: LectureModalOutletProps) => {
  return (
    <div className="flex max-h-[85vh] flex-col overflow-hidden">
      <div className="flex-1 overflow-y-auto p-6">
        <div className="mx-auto w-full max-w-4xl">
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            {/* 왼쪽 */}
            <section className="space-y-4">
              <div className="relative h-[240px] w-full overflow-hidden rounded-lg border-2">
                <img
                  src={lecture.thumbnail}
                  alt={lecture.title}
                  className="h-full w-full object-cover"
                />
              </div>

              <ModalPair
                label="고유 ID"
                value={lecture.id}
                noBorder
                className="text-sm font-semibold text-gray-900"
              />
              <ModalPair
                label="UUID"
                value={
                  <span className="font-mono text-xs leading-relaxed break-all">
                    {lecture.uuid}
                  </span>
                }
                noBorder
              />
              <ModalPair
                label="강의명"
                value={
                  <span className="text-xl leading-snug font-extrabold">
                    {lecture.title}
                  </span>
                }
                noBorder
              />
              <ModalPair
                label="강사명"
                value={
                  <span className="font-medium">{lecture.instructor}</span>
                }
                noBorder
              />
              <ModalPair
                label="플랫폼"
                value={<PlatformBadge platform={lecture.platform} />}
                noBorder
              />
              <ModalPair
                label="바로가기 링크"
                value={
                  <a
                    href={lecture.urlLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block text-sm break-all text-orange-600 hover:underline"
                  >
                    {lecture.urlLink}
                  </a>
                }
                noBorder
              />
            </section>

            {/* 오른쪽 */}
            <section className="space-y-5">
              <div className="rounded-lg bg-gray-50 p-4">
                <h3 className="mb-2 text-sm font-semibold text-gray-700">
                  강의 설명
                </h3>
                <p className="text-sm leading-relaxed whitespace-pre-wrap text-gray-800">
                  {lecture.description || '설명이 없습니다.'}
                </p>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <ModalPair
                  label="강의 난이도"
                  value={
                    <Badge
                      variant={
                        lecture.difficulty === '쉬움'
                          ? 'success'
                          : lecture.difficulty === '보통'
                            ? 'warning'
                            : 'danger'
                      }
                      label={lecture.difficulty}
                    />
                  }
                  noBorder
                />
                <ModalPair
                  label="총 강의 길이"
                  value={
                    <span className="font-semibold text-gray-900">
                      {formatDuration(lecture.duration)}
                    </span>
                  }
                  noBorder
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <ModalPair
                  label="원 가격"
                  value={
                    lecture.originalPrice && lecture.originalPrice > 0 ? (
                      <span className="text-gray-500 line-through">
                        {lecture.originalPrice.toLocaleString()}원
                      </span>
                    ) : (
                      <span className="text-sm text-gray-400">
                        가격 정보 없음
                      </span>
                    )
                  }
                  noBorder
                />
                <ModalPair
                  label="할인된 가격"
                  value={
                    lecture.discountPrice && lecture.discountPrice > 0 ? (
                      <span className="text-2xl font-bold text-yellow-500">
                        {lecture.discountPrice.toLocaleString()}원
                      </span>
                    ) : (
                      <span className="text-sm text-gray-400">
                        가격 정보 없음
                      </span>
                    )
                  }
                  noBorder
                />
              </div>

              <ModalPair
                label="해당 카테고리"
                value={
                  lecture.categories && lecture.categories.length > 0 ? (
                    <div className="flex flex-wrap gap-2">
                      {lecture.categories.map((category, index) => (
                        <Badge key={index} variant="default" label={category} />
                      ))}
                    </div>
                  ) : (
                    <span className="text-sm text-gray-400">카테고리 없음</span>
                  )
                }
                noBorder
              />

              <div className="grid grid-cols-2 gap-4">
                <ModalPair
                  label="생성일시"
                  value={
                    <span className="text-sm text-gray-600">
                      {lecture.createdAt}
                    </span>
                  }
                  noBorder
                />
                <ModalPair
                  label="수정일시"
                  value={
                    <span className="text-sm text-gray-600">
                      {lecture.updatedAt}
                    </span>
                  }
                  noBorder
                />
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  )
}
