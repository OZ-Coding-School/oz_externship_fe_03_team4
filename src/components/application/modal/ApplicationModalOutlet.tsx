import { ModalPair } from '../../reviews/ModalPair'
import { StatusBadge } from '../table/StatusBadge'
import type { ApplicationDetail } from '../../../types/applications'

export const ApplicationModalOutlet = ({
  detail,
}: {
  detail: ApplicationDetail
}) => {
  const MULTILINE_PROPS = {
    // 중복되는 부분들 상수로 선언해서 조금이라도 줄이기
    multiline: true,
    minHeightClass: 'min-h-[60px]',
  } as const
  const {
    aid,
    id,
    applicationCode,
    postingTitle,
    applicant,
    applicantExtra,
    status,
    appliedAt,
    updatedAt,
    selfIntroduction,
    motivation,
    objective,
    availableTime,
    hasStudyExperience,
    studyExperience,
    recruitment,
  } = detail
  const applicationIdDisplay =
    applicationCode ?? (typeof aid === 'number' ? `#${aid}` : id)

  return (
    <div className="grid grid-cols-1 gap-8 sm:grid-cols-2">
      <section className="space-y-4">
        <h3 className="mb-2 text-base font-semibold text-neutral-800">
          스터디 구인 공고 정보
        </h3>
        <ModalPair label="공고명" value={recruitment?.title ?? postingTitle} />

        <div>
          <ModalPair
            label="모집 인원"
            value={
              typeof recruitment?.expectedHeadcount === 'number'
                ? `${recruitment.expectedHeadcount}명`
                : '-'
            }
          />
          <ModalPair label="마감일" value={recruitment?.deadline ?? '-'} />
        </div>

        <ModalPair
          label="강의 목록"
          value={
            recruitment?.courses?.length ? (
              <ul className="list-dics list-inside space-y-1 text-sm text-neutral-700">
                {recruitment.courses.map((course, i) => (
                  <li key={`${course.name}-${i}`}>
                    <span className="font-medium">{course.name}</span>
                    {course.instructor ? (
                      <span className="text-neutral">
                        {' '}
                        · {course.instructor}
                      </span>
                    ) : null}
                  </li>
                ))}
              </ul>
            ) : (
              '-'
            )
          }
        />

        <section>
          <h4 className="mb-2 text-sm font-semibold text-neutral-700">
            사용자 정의 태그
          </h4>
          {recruitment?.tags?.length ? (
            <div className="flex flex-wrap gap-2">
              {recruitment.tags.map((tag, i) => (
                <span
                  key={`${tag}-${i}`}
                  className="bg-neurtal-100 rounded-full px-2 py-1 text-xs text-neutral-700"
                >
                  #{tag}
                </span>
              ))}
            </div>
          ) : (
            <p className="text-sm text-neutral-500">-</p>
          )}
        </section>
      </section>

      <section className="space-y-4">
        <h3 className="mb-2 text-base font-semibold text-neutral-800">
          지원자 정보
        </h3>
        <div className="flex items-center gap-3 rounded-lg border border-neutral-200 bg-white p-3">
          {applicantExtra?.profileImage ? (
            <img
              src={applicantExtra.profileImage}
              alt="profile"
              className="h-12 w-12 rounded-full object-cover ring-1 ring-neutral-200"
            />
          ) : (
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-neutral-100 text-sm text-neutral-500">
              N/A
            </div>
          )}
          <div className="min-w-0">
            <div className="truncate font-medium text-neutral-900">
              {applicant?.name ?? '-'}
            </div>
            <div className="truncate text-sm text-neutral-600">
              {applicant?.email ?? '-'}
            </div>
            <div className="mt-0.5 text-xs text-neutral-500">
              성별: {applicantExtra?.gender ?? '-'}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-3 sm:grid-cols-1">
          <ModalPair label="지원 내역 ID" value={applicationIdDisplay} />
          <ModalPair label="지원일" value={appliedAt} />
          <ModalPair label="수정일" value={updatedAt} />
        </div>
        <ModalPair
          label="자기소개"
          value={selfIntroduction || '-'}
          {...MULTILINE_PROPS}
        />
        <ModalPair
          label="지원동기"
          value={motivation || '-'}
          {...MULTILINE_PROPS}
        />
        <ModalPair label="목표" value={objective || '-'} {...MULTILINE_PROPS} />

        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
          <ModalPair label="가능 시간대" value={availableTime || '-'} />
          <ModalPair
            label="스터디 경험"
            value={hasStudyExperience ? '예' : '아니오'}
          />
        </div>

        <ModalPair
          label="경험 상세"
          value={studyExperience || '-'}
          {...MULTILINE_PROPS}
        />
        {status ? (
          <div className="mt-4">
            <p className="mb-1 text-sm font-medium text-neutral-700">
              지원 상태
            </p>
            <StatusBadge status={status} />
          </div>
        ) : null}
      </section>
    </div>
  )
}
