import type { Lecture } from '../../types/lectureManagement/types'
import { Badge } from '../Badge'
import { ModalPair } from '../reviews/ModalPair'
import { PlatformBadge } from '../Lecture/PlatformBadge'

interface LectureModalOutletProps {
  lecture: Lecture
}

export const LectureModalOutlet = ({ lecture }: LectureModalOutletProps) => (
  <div className="flex max-h-[85vh] flex-col overflow-hidden">
    <div className="flex-1 overflow-y-auto p-6">
      <div className="mx-auto w-full max-w-4xl">
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          {/* 왼쪽 */}
          <section className="space-y-4">
            <div className="relative h-[240px] w-full overflow-hidden rounded-lg border-2 border-blue-400">
              <img
                src={lecture.thumbnail}
                alt={lecture.title}
                className="h-full w-full object-cover"
              />
            </div>

            <ModalPair label="고유 ID" value={lecture.id} noBorder />
            <ModalPair
              label="UUID"
              value={<span className="font-mono text-sm">{lecture.uuid}</span>}
              noBorder
            />
            <ModalPair
              label="강의명"
              value={
                <span className="text-xl font-extrabold">{lecture.title}</span>
              }
              noBorder
            />
            <ModalPair label="강사명" value={lecture.instructor} noBorder />
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
                  className="text-sm break-all text-orange-600 hover:underline"
                >
                  {lecture.urlLink}
                </a>
              }
              noBorder
            />
          </section>

          {/* 오른쪽 */}
          <section className="space-y-4">
            <div className="rounded-lg">
              <h3 className="mb-2 text-sm font-semibold text-gray-700">
                강의 설명
              </h3>
              <p className="text-sm leading-relaxed text-gray-800">
                {lecture.description}
              </p>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <ModalPair
                label="강의 난이도"
                value={<Badge variant="warning" label={lecture.difficulty} />}
                noBorder
              />
              <ModalPair
                label="총 강의 길이"
                value={lecture.duration}
                noBorder
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <ModalPair
                label="원 가격"
                value={
                  <span className="text-gray-500 line-through">
                    {(lecture.originalPrice ?? 0).toLocaleString()}원
                  </span>
                }
                noBorder
              />
              <ModalPair
                label="할인된 가격"
                value={
                  <span className="text-2xl font-bold text-yellow-500">
                    {(lecture.discountPrice ?? 0).toLocaleString()}원
                  </span>
                }
                noBorder
              />
            </div>

            <ModalPair
              label="해당 카테고리"
              value={
                <div className="flex flex-wrap gap-2">
                  {lecture.categories.map((category, index) => (
                    <Badge key={index} variant="default" label={category} />
                  ))}
                </div>
              }
              noBorder
            />

            <div className="grid grid-cols-2 gap-4">
              <ModalPair label="생성일시" value={lecture.createdAt} noBorder />
              <ModalPair label="수정일시" value={lecture.updatedAt} noBorder />
            </div>
          </section>
        </div>
      </div>
    </div>
  </div>
)
