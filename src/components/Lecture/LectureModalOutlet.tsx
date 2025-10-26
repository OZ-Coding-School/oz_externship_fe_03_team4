import type { LectureDetail } from '../../types/lectureManagement/types'
import { LectureThumbnail } from './LectureThumbnail'
import { Badge } from '../Badge'
import { ModalPair } from '../reviews/ModalPair'
import { PlatformBadge } from './PlatformBadge'

interface LectureModalOutletProps {
  lecture: LectureDetail
}

// 공통 스타일 상수
const NO_BORDER_INPUT_CLASS =
  '[&_input]:h-auto [&_input]:border-0 [&_input]:bg-transparent [&_input]:p-0'
const NO_BORDER_DIV_CLASS =
  '[&_div:last-child]:h-auto [&_div:last-child]:border-0 [&_div:last-child]:bg-transparent [&_div:last-child]:p-0'
const NO_BORDER_CLASS = `${NO_BORDER_INPUT_CLASS} ${NO_BORDER_DIV_CLASS}`

export const LectureModalOutlet = ({ lecture }: LectureModalOutletProps) => (
  <div className="max-h-[90vh] overflow-y-auto p-6">
    <div className="mx-auto w-full max-w-4xl">
      <div className="grid grid-cols-1 gap-6 md:grid-cols-[380px_1fr]">
        {/* 왼쪽: 썸네일 + 기본 정보 */}
        <section className="space-y-4">
          {/* 썸네일 */}
          <div className="relative h-[240px] w-full overflow-hidden rounded-lg border-2 border-blue-400">
            <LectureThumbnail src={lecture.thumbnail} alt={lecture.title} />
          </div>

          <ModalPair
            label="고유 ID"
            value={lecture.id}
            className={`${NO_BORDER_CLASS} [&_div:last-child]:text-base [&_div:last-child]:font-medium [&_input]:text-base [&_input]:font-medium`}
          />

          <ModalPair
            label="UUID"
            value={lecture.uuid}
            className={`${NO_BORDER_INPUT_CLASS} [&_input]:font-mono [&_input]:text-sm`}
          />

          <ModalPair
            label="강의명"
            value={lecture.title}
            className={`${NO_BORDER_INPUT_CLASS} [&_input]:text-lg [&_input]:font-bold`}
          />

          <ModalPair
            label="강사명"
            value={lecture.instructor}
            className={`${NO_BORDER_INPUT_CLASS} [&_input]:text-base`}
          />

          <ModalPair
            label="플랫폼"
            value={<PlatformBadge platform={lecture.platform} />}
            className={NO_BORDER_DIV_CLASS}
          />

          <ModalPair
            label="바로가기 링크"
            value={
              <a
                href={lecture.url_link}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm break-all text-orange-600 hover:underline"
              >
                {lecture.url_link}
              </a>
            }
            className={NO_BORDER_DIV_CLASS}
          />
        </section>

        {/* 오른쪽: 상세 정보 */}
        <section className="space-y-4">
          {/* 강의 설명 */}
          <div>
            <h3 className="mb-2 text-sm font-semibold text-gray-700">
              강의 설명
            </h3>
            <p className="text-sm leading-relaxed text-gray-800">
              {lecture.description}
            </p>
          </div>

          {/* 강의 난이도 & 총 강의 길이 */}
          <div className="grid grid-cols-2 gap-4">
            <ModalPair
              label="강의 난이도"
              value={<Badge variant="warning" label={lecture.difficulty} />}
              className={NO_BORDER_DIV_CLASS}
            />
            <ModalPair
              label="총 강의 길이"
              value={lecture.duration}
              className={`${NO_BORDER_CLASS} [&_div:last-child]:text-sm [&_div:last-child]:text-gray-800 [&_input]:text-sm [&_input]:text-gray-800`}
            />
          </div>

          {/* 가격 정보 */}
          <div className="grid grid-cols-2 gap-4">
            <ModalPair
              label="월 가격"
              value={
                <span className="text-base text-gray-400 line-through">
                  {lecture.originalPrice.toLocaleString()}원
                </span>
              }
              className={NO_BORDER_DIV_CLASS}
            />
            <ModalPair
              label="할인된 가격"
              value={
                <span className="text-xl font-bold text-orange-500">
                  {lecture.discountPrice.toLocaleString()}원
                </span>
              }
              className={NO_BORDER_DIV_CLASS}
            />
          </div>

          {/* 카테고리 */}
          <ModalPair
            label="해당 카테고리"
            value={
              <div className="flex flex-wrap gap-2">
                {lecture.categories.map((category, index) => (
                  <Badge key={index} variant="default" label={category} />
                ))}
              </div>
            }
            className={NO_BORDER_DIV_CLASS}
          />

          {/* 날짜 정보 */}
          <div className="grid grid-cols-2 gap-4">
            <ModalPair
              label="생성일시"
              value={lecture.createdAt}
              className={`${NO_BORDER_INPUT_CLASS} [&_input]:text-sm [&_input]:text-gray-800`}
            />
            <ModalPair
              label="수정일시"
              value={lecture.updatedAt}
              className={`${NO_BORDER_INPUT_CLASS} [&_input]:text-sm [&_input]:text-gray-800`}
            />
          </div>
        </section>
      </div>
    </div>
  </div>
)
