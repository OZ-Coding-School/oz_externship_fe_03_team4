import { useState } from 'react'
import { useDebouncedValue } from '../useDebouncedValue'

export const useLectureSearch = () => {
  const [searchKeyword, setSearchKeyword] = useState('')
  const debouncedSearch = useDebouncedValue(searchKeyword, 500)

  const handleSearchChange = (keyword: string) => {
    setSearchKeyword(keyword)
  }

  const clearSearch = () => {
    setSearchKeyword('')
  }

  return {
    searchKeyword,
    debouncedSearch,
    handleSearchChange,
    clearSearch,
  }
}
