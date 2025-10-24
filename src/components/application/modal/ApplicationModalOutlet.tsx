import { ModalPair } from '../../reviews/ModalPair'
import { StatusBadge } from '../table/StatusBadge'
import type { ApplicationDetail } from '../../../types/applications'

export const ApplicationModalOutlet = ({
  detail,
}: {
  detail: ApplicationDetail
}) => {
  const {
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

  return (
    <div className="grid grid-cols-1 gap-8 sm:grid-cols-2">
      <section className="space-y-4">
        <h3 className="mb-2 text-base font-semibold text-neutral-800">
          공고 정보
        </h3>
        <ModalPair label="공고명" value={recruitment?.title ?? postingTitle} />

        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
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
          label="태그"
          value={
            recruitment?.tags?.length ? (
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
              '-'
            )
          }
        />
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
      </section>

      <section className="space-y-4">
        <h3 className="mb-2 text-base font-semibold text-neutral-800">
          지원자 정보
        </h3>
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
          <ModalPair label="닉네임" value={applicant?.name ?? '-'} />
          <ModalPair label="이메일" value={applicant?.email ?? '-'} />
        </div>

        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
          <ModalPair label="성벌" value={applicantExtra?.gender ?? '-'} />
          <ModalPair
            label="프로필"
            value={
              applicantExtra?.profileImage ? (
                <img
                  src={applicantExtra.profileImage}
                  alt="profile"
                  className="h-10 w-10 rounded-full object-cover ring-1 ring-neutral-200"
                />
              ) : (
                '-'
              )
            }
          />
        </div>

        <h3 className="mt-6 text-base font-semibold text-neutral-800">
          지원서 정보
        </h3>
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
          <ModalPair label="상태" value={<StatusBadge status={status} />} />
          <ModalPair label="지원일" value={appliedAt} />
          <ModalPair label="수정일" value={updatedAt} />
        </div>
        <ModalPair
          label="자기소개"
          value={selfIntroduction || '-'}
          multiline
          minHeightClass="min-h-[100px]"
        />
        <ModalPair
          label="지원동기"
          value={motivation || '-'}
          multiline
          minHeightClass="min-h-[100px]"
        />
        <ModalPair
          label="목표"
          value={objective || '-'}
          multiline
          minHeightClass="min-h-[100px]"
        />

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
          multiline
          minHeightClass="min-h-[100px]"
        />
      </section>
    </div>
  )
}
