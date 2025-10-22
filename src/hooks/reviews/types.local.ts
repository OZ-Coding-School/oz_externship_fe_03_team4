export type ReviewsParams = {
  searchText?: string
  pageNumber?: number
  pageSize: number
  sortKey?:
    | 'created_at'
    | '-created_at'
    | 'updated_at'
    | '-updated_at'
    | 'rating'
    | '-rating'
}
