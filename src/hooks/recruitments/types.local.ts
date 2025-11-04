export type AdminRecruitmentsParams = {
  searchText?: string
  statusFilter?: '모집중' | '마감'
  selectedTags?: string[]
  ordering: 'latest' | 'oldest' | 'views' | 'bookmarks'
  pageNumber?: number
  pageSize?: number
}
