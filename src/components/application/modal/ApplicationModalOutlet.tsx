import { ModalPair } from '../../reviews/ModalPair'
import { StatusBadge } from '../table/StatusBadge'
import type { ApplicationDetail } from '../../../types/applications'
import Modal from '../../modal/Modal'

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
    </div>
  )
}
