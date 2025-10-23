import { useMemo, useRef, useState } from 'react'
import { useSearchParams } from 'react-router'
import {
  SearchInput,
  type SearchInputRef,
} from '../components/search/SearchInput'
import { Pagination } from '../components/pagination/Pagination'
import { useDebouncedValue } from '../hooks/useDebouncedValue'
import {
  useReviewsQuery,
  type ReviewsParams,
} from '../hooks/reviews/useReviewsQuery'
import { Table } from '../components/Data-Indicate/Table'
import { RatingStars } from '../components/Reviews/RatingStars'
import { Select } from '../components/FormUI'
import { ReviewModal } from '../components/Reviews/ReviewModal'
import {
  type ReviewDetail,
  type Review,
  mapReviewToDetail,
} from '../types/reviews/types'

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

  const searchInputReference = useRef<SearchInputRef>(null)

  const tableColumns = [
    {
      key: 'id',
      label: 'ID',
      render: (value: unknown, row: Record<string, unknown>) => (
        <button
          onClick={() => {
            const review = row as Review
            const detail = mapReviewToDetail(review)
            setSelectedReview(detail)
            setIsModalOpen(true)
          }}
          className="text-neutral-600 hover:underline"
        >
          {String(value)}
        </button>
      ),
    },
    { key: 'studyTitle', label: '스터디' },
    {
      key: 'author',
      label: '작성자',
      render: (_unusedValue: unknown, row: Record<string, unknown>) => {
        const author = row.author as { name: string; email: string }
        return (
          <div className="min-w-[12rem]">
            <div className="truncate text-neutral-800">{author.name}</div>
            <div className="truncate text-neutral-400">{author.email}</div>
          </div>
        )
      },
    },
    {
      key: 'summary',
      label: '리뷰내용',
      render: (value: unknown) => (
        <div className="line-clamp-2 max-w-[520px]">{value as string}</div>
      ),
    },
    {
      key: 'rating',
      label: '별점',
      render: (value: unknown) => (
        <div className="flex justify-end">
          <RatingStars value={Number(value)} />
        </div>
      ),
    },
    {
      key: 'createdAt',
      label: '작성일',
      render: (value: unknown) => (
        <span className="font-mono text-[12px] text-neutral-600">
          {String(value)}
        </span>
      ),
    },
  ]

  const tableData: Record<string, unknown>[] = useMemo(() => {
    if (!reviewListData?.items) return []
    return reviewListData.items.map((review) => ({
      id: `#${review.id}`,
      studyTitle: review.studyTitle,
      author: { name: review.authorName, email: review.authorEmail },
      summary: review.summary,
      rating: review.rating ?? 0,
      createdAt: new Date(review.createdAt).toLocaleString(),
    }))
  }, [reviewListData])

  const hasData = tableData.length > 0

  return (
    <div className="space-y-4 p-6">
      <h1 className="text-lg font-semibold">리뷰 관리</h1>

      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <SearchInput
          ref={searchInputReference}
          value={searchText}
          onChangeText={(nextValue) => {
            setSearchText(nextValue)
            setCurrentPageNumber(1)
            if (nextValue.trim() === '') updateURLQueryParams('', 1)
          }}
          onSubmit={(submittedValue) => {
            const trimmedValue = submittedValue.trim()
            setSearchText(trimmedValue)
            setCurrentPageNumber(1)
            updateURLQueryParams(trimmedValue, 1)
          }}
          placeholder="사용자 닉네임 또는 이메일로 검색해주세요."
          inputProps={{ type: 'text', enterKeyHint: 'search' }}
          className="max-w-xl flex-1"
        />

        <div className="w-60">
          <Select
            value={currentSortKey}
            onChange={(e) => {
              setCurrentSortKey(e.target.value as typeof currentSortKey)
              setCurrentPageNumber(1)
              updateURLQueryParams(searchText, 1)
            }}
          >
            <option value="-created_at">작성일 최신순</option>
            <option value="created_at">작성일 오래된순</option>
            <option value="-updated_at">수정일 최신순</option>
            <option value="updated_at">수정일 오래된순</option>
            <option value="-rating">별점 높은순</option>
            <option value="rating">별점 낮은순</option>
          </Select>
        </div>
      </div>

      <section className="relative rounded-xl border border-neutral-200 bg-white shadow-sm">
        {(isReviewListLoading || (!hasData && isFetching)) && (
          <div className="absolute inset-0 z-10 flex items-center justify-center bg-white/60 backdrop-blur-sm">
            <div className="rounded-md border px-3 py-2 text-sm text-neutral-600">
              데이터를 불러오고 있습니다…
            </div>
          </div>
        )}

        <div className="max-h-[520px] overflow-auto rounded-xl">
          <Table
            columns={tableColumns}
            data={tableData}
            className="rounded-none border-t border-neutral-200"
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
              searchInputReference.current?.focus()
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
