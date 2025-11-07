import { applicationAdminHandlers } from './applications.admin'
import { recruitmentAdminHandlers } from './recruitments.admin'
// import { studyGroupAdminHandlers } from './studygroups.admin'
import { reviewsAdminHandlers } from './reviews.admin'
import { dashboardStatsHandlers } from './dashboard.stats'
import { withdrawalsAdminHandlers } from './withdrawals.admin'

export const handlers = [
  ...applicationAdminHandlers,
  ...recruitmentAdminHandlers,
  // ...studyGroupAdminHandlers, //api로 바꿔서 주석처리
  ...reviewsAdminHandlers,
  ...dashboardStatsHandlers,
  ...withdrawalsAdminHandlers,
]
