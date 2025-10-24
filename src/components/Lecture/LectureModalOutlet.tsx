import type { LectureDetail } from '../../types/lectureManagement/types'
import { LectureThumbnail } from './LectureThumbnail'
import { PlatformBadge } from '../Lecture/PlatformBadge'
import { Badge } from '../Badge'

interface LectureModalOutletProps {
  lecture: LectureDetail
}

export const LectureModalOutlet = ({ lecture }: LectureModalOutletProps) => (
  <div className="h-[80vh] flex-1 overflow-auto p-6">
    <div className="mx-auto w-full max-w-4xl">
      <div className="grid grid-cols-1 gap-6 md:grid-cols-[380px_1fr]">
        {/* 왼쪽 */}
        <section className="space-y-4">
          {/* 썸네일 */}
          <div className="relative h-[240px] w-full overflow-hidden rounded-lg border-2 border-blue-400">
            <LectureThumbnail src={lecture.thumbnail} alt={lecture.title} />
          </div>

          {/* 고유 ID */}
          <div>
            <p className="text-sm text-gray-600">고유 ID</p>
            <p className="text-base font-medium">{lecture.id}</p>
          </div>

          {/* UUID */}
          <div>
            <p className="text-sm text-gray-600">UUID</p>
            <p className="font-mono text-sm break-all">{lecture.uuid}</p>
          </div>

          {/* 강의명 */}
          <div>
            <p className="text-sm text-gray-600">강의명</p>
            <p className="text-lg font-bold">{lecture.title}</p>
          </div>

          {/* 강사명 */}
          <div>
            <p className="text-sm text-gray-600">강사명</p>
            <p className="text-base">{lecture.instructor}</p>
          </div>

          {/* 플랫폼 */}
          <div>
            <p className="mb-2 text-sm text-gray-600">플랫폼</p>
            <PlatformBadge platform={lecture.platform} />
          </div>

          {/* 바로가기 링크 */}
          <div>
            <p className="text-sm text-gray-600">바로가기 링크</p>
            <a
              href={lecture.url_link}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm break-all text-orange-600 hover:underline"
            >
              {lecture.url_link}
            </a>
          </div>
        </section>

        {/* 오른쪽 */}
        <section className="space-y-4">
          {/* 강의 설명 */}
          <div className="rounded-lg">
            <h3 className="mb-2 text-sm font-semibold text-gray-700">
              강의 설명
            </h3>
            <p className="text-sm leading-relaxed text-gray-800">
              {lecture.description}
            </p>
          </div>

          {/* 강의 난이도 & 총 강의 길이*/}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="mb-2 text-sm text-gray-600">강의 난이도</p>
              <Badge variant="warning" label={lecture.difficulty} />
            </div>
            <div>
              <p className="mb-2 text-sm text-gray-600">총 강의 길이</p>
              <span className="text-sm text-gray-800">{lecture.duration}</span>
            </div>
          </div>

          {/* 가격 정보 */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="mb-1 text-sm text-gray-600">월 가격</p>
              <p className="text-base text-gray-400 line-through">
                {lecture.originalPrice.toLocaleString()}원
              </p>
            </div>
            <div>
              <p className="mb-1 text-sm text-gray-600">할인된 가격</p>
              <p className="text-xl font-bold text-orange-500">
                {lecture.discountPrice.toLocaleString()}원
              </p>
            </div>
          </div>

          {/* 카테고리 */}
          <div>
            <p className="mb-2 text-sm text-gray-600">해당 카테고리</p>
            <div className="flex flex-wrap gap-2">
              {lecture.categories.map((category, index) => (
                <Badge key={index} variant="default" label={category} />
              ))}
            </div>
          </div>

          {/* 날짜 정보 */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="mb-1 text-sm text-gray-600">생성일시</p>
              <p className="text-sm text-gray-800">{lecture.createdAt}</p>
            </div>
            <div>
              <p className="mb-1 text-sm text-gray-600">수정일시</p>
              <p className="text-sm text-gray-800">{lecture.updatedAt}</p>
            </div>
          </div>
        </section>
      </div>
    </div>
  </div>
)
