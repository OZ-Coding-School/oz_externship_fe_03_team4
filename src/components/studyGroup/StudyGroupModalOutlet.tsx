import type { StudyGroupDetail } from '../../types/studyGroup/types'
import { Badge } from '../Badge'
import { ModalPair } from '../reviews/ModalPair'
import { StudyGroupStatusBadge } from './StudyGroupStatusBadge'
import { ExternalLink, User } from 'lucide-react'

interface StudyGroupModalOutletProps {
  studyGroup: StudyGroupDetail
}

export const StudyGroupModalOutlet = ({
  studyGroup,
}: StudyGroupModalOutletProps) => (
  <div className="max-h-[70vh] overflow-y-auto">
    <div className="grid w-full grid-cols-2 gap-6">
      {/* 왼쪽 */}
      <section className="w-[420px] flex-shrink-0 space-y-6">
        <h3 className="mb-3 text-sm font-semibold text-gray-700">
          스터디 그룹 대표 이미지
        </h3>
        {/* 대표 이미지 */}
        <div className="relative h-[200px] w-[380px] overflow-hidden rounded-lg border border-gray-200">
          <img
            src={studyGroup.profileImg}
            alt={studyGroup.name}
            className="h-full w-full object-cover"
            onError={(e) => {
              e.currentTarget.src =
                'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 48 48"%3E%3Crect width="48" height="48" fill="%23e5e7eb"/%3E%3Cpath d="M14 18h20M14 24h20M14 30h12" stroke="%239ca3af" stroke-width="2" stroke-linecap="round"/%3E%3C/svg%3E'
            }}
          />
        </div>

        <div className="space-y-4">
          <ModalPair label="그룹명" value={studyGroup.name} noBorder />

          <div className="grid grid-cols-2 gap-4">
            <ModalPair label="고유 ID" value={studyGroup.id} noBorder />
            <ModalPair
              label="UUID"
              value={
                <span className="block font-mono text-xs break-all">
                  {studyGroup.uuid}
                </span>
              }
              noBorder
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
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
          </div>

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

          <div className="grid grid-cols-2 gap-4">
            <ModalPair label="생성일시" value={studyGroup.createdAt} noBorder />
            <ModalPair label="수정일시" value={studyGroup.updatedAt} noBorder />
          </div>
        </div>
      </section>

      {/* 오른쪽 */}
      <section className="flex min-w-0 flex-1 flex-col gap-6">
        <div>
          <h3 className="mb-3 text-sm font-semibold text-gray-700">
            멤버 목록
          </h3>
          <div className="grid gap-2">
            {studyGroup.members.map((member, index) => (
              <div
                key={index}
                className="flex items-center gap-2 rounded-md bg-gray-50 px-3 py-2.5"
              >
                <User size={16} className="flex-shrink-0 text-gray-500" />
                <span className="min-w-0 flex-1 truncate text-sm text-gray-900">
                  {member.nickname}
                </span>
                {member.isLeader && <Badge variant="warning" label="리더" />}
              </div>
            ))}
          </div>
        </div>

        <div>
          <h3 className="mb-3 text-sm font-semibold text-gray-900">
            스터디 강의 목록
          </h3>
          <div className="space-y-3">
            {studyGroup.lectures.map((lecture, index) => (
              <div
                key={index}
                className="flex items-start gap-3 rounded-lg border border-gray-200 bg-white p-4"
              >
                <div className="h-20 w-28 flex-shrink-0 overflow-hidden rounded border border-gray-200">
                  <img
                    src={lecture.thumbnailImgUrl}
                    alt={lecture.title}
                    className="h-[90px] w-full object-cover"
                    onError={(e) => {
                      e.currentTarget.src =
                        'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 48 48"%3E%3Crect width="48" height="48" fill="%23e5e7eb"/%3E%3Cpath d="M14 18h20M14 24h20M14 30h12" stroke="%239ca3af" stroke-width="2" stroke-linecap="round"/%3E%3C/svg%3E'
                    }}
                  />
                </div>

                <div className="min-w-0 flex-1">
                  <p className="text-m font-semibold text-gray-800">
                    {lecture.title}
                  </p>
                  <p className="mt-2 text-[13px] font-semibold text-gray-500">
                    강사: {lecture.instructor}
                  </p>
                  <a
                    href={lecture.urlLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-2 inline-flex items-center text-[12px] text-yellow-600 hover:text-yellow-800 hover:underline"
                  >
                    <ExternalLink size={12} />
                    &nbsp;강의 바로가기
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  </div>
)
