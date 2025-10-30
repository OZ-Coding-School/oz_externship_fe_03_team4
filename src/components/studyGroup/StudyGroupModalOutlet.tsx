import type { StudyGroupDetail } from '../../types/studyGroup/types'
import { Badge } from '../Badge'
import { ModalPair } from '../reviews/ModalPair'
import { StudyGroupStatusBadge } from './StudyGroupStatusBadge'
import { User } from 'lucide-react'

interface StudyGroupModalOutletProps {
  studyGroup: StudyGroupDetail
}

export const StudyGroupModalOutlet = ({
  studyGroup,
}: StudyGroupModalOutletProps) => (
  <div className="flex max-h-[85vh] flex-col overflow-hidden">
    <div className="flex-1 overflow-y-auto p-6">
      <div className="mx-auto w-full max-w-4xl">
        <div className="grid grid-cols-1 gap-6 md:grid-cols-[380px_1fr]">
          {/* 왼쪽  */}
          <section className="space-y-4">
            {/* 스터디 그룹 대표 이미지 */}
            <div className="relative h-[240px] w-full overflow-hidden rounded-lg border-2 border-blue-400">
              <img
                src={studyGroup.profileImg}
                alt={studyGroup.name}
                className="h-full w-full object-cover"
                onError={(e) => {
                  e.currentTarget.src =
                    'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="380" height="240" viewBox="0 0 380 240"%3E%3Crect width="380" height="240" fill="%23e5e7eb"/%3E%3Ctext x="50%25" y="50%25" dominant-baseline="middle" text-anchor="middle" font-family="sans-serif" font-size="16" fill="%239ca3af"%3E스터디 그룹 이미지%3C/text%3E%3C/svg%3E'
                }}
              />
            </div>

            <ModalPair label="그룹명" value={studyGroup.name} noBorder />
            <ModalPair label="고유 ID" value={studyGroup.id} noBorder />
            <ModalPair
              label="UUID"
              value={
                <span className="font-mono text-sm">{studyGroup.uuid}</span>
              }
              noBorder
            />
            <ModalPair
              label="인원 현황"
              value={
                <span className="font-semibold">
                  {studyGroup.currentHeadcount} / {studyGroup.maxHeadcount}명
                </span>
              }
              noBorder
            />
            <ModalPair
              label="스터디 상태"
              value={<StudyGroupStatusBadge status={studyGroup.status} />}
              noBorder
            />
          </section>

          {/* 오른쪽  */}
          <section className="space-y-4">
            {/* 멤버 목록 */}
            <div className="rounded-lg">
              <h3 className="mb-3 text-sm font-semibold text-gray-700">
                멤버 목록
              </h3>
              <div className="space-y-2">
                {studyGroup.members.map((member, index) => (
                  <div
                    key={index}
                    className="flex items-center gap-2 rounded-md border border-gray-200 bg-gray-50 px-3 py-2"
                  >
                    <User size={16} className="text-gray-500" />
                    <span className="flex-1 text-sm text-gray-900">
                      {member.nickname}
                    </span>
                    {member.isLeader && (
                      <Badge variant="warning" label="리더" />
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* 스터디 기간 */}
            <div className="grid grid-cols-2 gap-4">
              <ModalPair
                label="스터디 시작일"
                value={studyGroup.startAt}
                noBorder
              />
              <ModalPair
                label="스터디 종료일"
                value={studyGroup.endAt}
                noBorder
              />
            </div>

            {/* 스터디 강의 목록 */}
            <div className="rounded-lg">
              <h3 className="mb-3 text-sm font-semibold text-gray-700">
                스터디 강의 목록
              </h3>
              <div className="space-y-3">
                {studyGroup.lectures.map((lecture, index) => (
                  <div
                    key={index}
                    className="flex items-start gap-3 rounded-md border border-gray-200 bg-white p-3"
                  >
                    {/* 강의 썸네일 */}
                    <div className="h-16 w-24 flex-shrink-0 overflow-hidden rounded border border-gray-200">
                      <img
                        src={lecture.thumbnailImgUrl}
                        alt={lecture.title}
                        className="h-full w-full object-cover"
                        onError={(e) => {
                          e.currentTarget.src =
                            'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="96" height="64" viewBox="0 0 96 64"%3E%3Crect width="96" height="64" fill="%23e5e7eb"/%3E%3C/svg%3E'
                        }}
                      />
                    </div>
                    {/* 강의 정보 */}
                    <div className="min-w-0 flex-1">
                      <p className="truncate text-sm font-semibold text-gray-900">
                        {lecture.title}
                      </p>
                      <p className="mt-1 text-xs text-gray-500">
                        강사: {lecture.instructor}
                      </p>
                      <a
                        href={lecture.urlLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="mt-1 inline-block text-xs text-orange-600 hover:underline"
                      >
                        강의 바로가기 →
                      </a>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* 생성/수정 일시 */}
            <div className="grid grid-cols-2 gap-4">
              <ModalPair
                label="생성일시"
                value={studyGroup.createdAt}
                noBorder
              />
              <ModalPair
                label="수정일시"
                value={studyGroup.updatedAt}
                noBorder
              />
            </div>
          </section>
        </div>
      </div>
    </div>
  </div>
)
