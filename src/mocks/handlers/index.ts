import { applicationAdminHandlers } from './applications.admin'
import { recruitmentAdminHandlers } from './recruitments.admin'
import { studyGroupAdminHandlers } from './studygroups.admin'
import { reviewsAdminHandlers } from './reviews.admin'
import { dashboardStatsHandlers } from './dashboard.stats'

export const handlers = [
  ...applicationAdminHandlers,
  ...recruitmentAdminHandlers,
  ...studyGroupAdminHandlers,
  ...reviewsAdminHandlers,
  ...dashboardStatsHandlers,
]
