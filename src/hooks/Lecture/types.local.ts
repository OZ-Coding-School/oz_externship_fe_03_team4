export type LecturesParams = {
  searchText?: string
  pageNumber?: number
  pageSize: number
  platform?: 'inflearn' | 'udemy'
  difficulty?: 'EASY' | 'NORMAL' | 'HARD'
  sortKey?:
    | 'created_at'
    | '-created_at'
    | 'updated_at'
    | '-updated_at'
    | 'average_rating'
    | '-average_rating'
    | 'title'
    | '-title'
}
