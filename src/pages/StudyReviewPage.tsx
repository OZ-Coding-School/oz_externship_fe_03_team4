import { useMemo, useState } from 'react'
import { useSearchParams } from 'react-router'
import { Pagination } from '../components/pagination/Pagination'
import { useDebouncedValue } from '../hooks/useDebouncedValue'
import {
  useReviewsQuery,
  type ReviewsParams,
} from '../hooks/reviews/useReviewsQuery'
import { ReviewModal } from '../components/reviews/ReviewModal'
import {
  type ReviewDetail,
  type Review,
  mapReviewToDetail,
} from '../types/reviews/types'
import { ReviewFilterSection } from '../components/reviews/filter/ReviewFilterSection'
import { ReviewTableSection } from '../components/reviews/table/ReviewTableSection'

const DEFAULT_PAGE_SIZE = 20

const StudyReviewPage = () => {
  const [searchParams, setSearchParams] = useSearchParams()
  const initialSearchKeyword = searchParams.get('search') ?? ''
  const initialPageNumber = Number(searchParams.get('page') ?? '1')

  const [selectedReview, setSelectedReview] = useState<ReviewDetail | null>(
    null
  )
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [searchText, setSearchText] = useState(initialSearchKeyword)
  const [currentPageNumber, setCurrentPageNumber] = useState(initialPageNumber)
  const [currentSortKey, setCurrentSortKey] =
    useState<NonNullable<ReviewsParams['sortKey']>>('-created_at')
  const [ratingMin, setRatingMin] = useState<number | '전체'>('전체')

  const debouncedSearchText = useDebouncedValue(searchText, 300)

  const {
    data: reviewListData,
    isLoading: isReviewListLoading,
    isFetching,
  } = useReviewsQuery({
    searchText: debouncedSearchText || undefined,
    pageNumber: currentPageNumber,
    pageSize: DEFAULT_PAGE_SIZE,
    sortKey: currentSortKey,
  })

  const totalPages = useMemo(() => {
    if (!reviewListData) return 1
    return Math.max(
      1,
      Math.ceil(reviewListData.totalCount / reviewListData.pageSize)
    )
  }, [reviewListData])

  const updateURLQueryParams = (
    nextSearchText = searchText,
    nextPageNumber = currentPageNumber
  ) => {
    const nextParams = new URLSearchParams()
    if (nextSearchText.trim()) nextParams.set('search', nextSearchText.trim())
    nextParams.set('page', String(nextPageNumber))
    setSearchParams(nextParams, { replace: true })
  }

  const reviewRows: Review[] = useMemo(
    () => reviewListData?.items ?? [],
    [reviewListData]
  )
  const hasData = reviewRows.length > 0

  return (
    <div className="space-y-4 p-6">
      <h1 className="text-lg font-semibold">리뷰 관리</h1>

      <ReviewFilterSection
        searchText={searchText}
        onSearchTextChange={(next) => {
          setSearchText(next)
          setCurrentPageNumber(1)
          if (next.trim() === '') updateURLQueryParams('', 1)
        }}
        onSearchSubmit={(submitted) => {
          const trimmed = submitted.trim()
          setSearchText(trimmed)
          setCurrentPageNumber(1)
          updateURLQueryParams(trimmed, 1)
        }}
        sortKey={currentSortKey}
        onSortKeyChange={(next) => {
          setCurrentSortKey(next)
          setCurrentPageNumber(1)
          updateURLQueryParams(searchText, 1)
        }}
        ratingMin={ratingMin}
        onRatingMinChange={(next) => {
          setRatingMin(next)
          setCurrentPageNumber(1)
        }}
      />

      <section className="relative rounded-xl border border-neutral-200 bg-white shadow-sm">
        {(isReviewListLoading || (!hasData && isFetching)) && (
          <div className="absolute inset-0 z-10 flex items-center justify-center bg-white/60 backdrop-blur-sm">
            <div className="rounded-md border px-3 py-2 text-sm text-neutral-600">
              데이터를 불러오고 있습니다…
            </div>
          </div>
        )}

        <div className="max-h-[520px] overflow-auto rounded-xl">
          <ReviewTableSection
            data={reviewRows}
            onRowClick={(row) => {
              const detail = mapReviewToDetail(row)
              setSelectedReview(detail)
              setIsModalOpen(true)
            }}
          />
        </div>
      </section>

      {hasData && (
        <div className="flex justify-end">
          <Pagination
            currentPage={currentPageNumber}
            totalPages={totalPages}
            onPageChange={(nextPageNumber) => {
              setCurrentPageNumber(nextPageNumber)
              updateURLQueryParams(searchText, nextPageNumber)
            }}
          />
        </div>
      )}
      {selectedReview && (
        <ReviewModal
          open={isModalOpen}
          onClose={() => {
            setIsModalOpen(false)
            setSelectedReview(null)
          }}
          review={selectedReview}
        />
      )}
    </div>
  )
}

export default StudyReviewPage
