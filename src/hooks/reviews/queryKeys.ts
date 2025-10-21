// 키 모듈
export const adminReviewQueryKey = (queryParams: Record<string, string | number>) =>
['admin:reviews', queryParams] as const