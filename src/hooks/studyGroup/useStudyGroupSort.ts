import { useState, useMemo } from 'react'
import type { StudyGroup } from '../../types/studyGroup/types'

export const useStudyGroupSort = (studyGroups: StudyGroup[]) => {
  const [sortKey, setSortKey] = useState('')

  const sortedStudyGroups = useMemo(() => {
    if (!sortKey) return studyGroups

    const isDescending = sortKey.startsWith('-')
    const key = isDescending ? sortKey.slice(1) : sortKey

    return [...studyGroups].sort((a, b) => {
      const aValue = a[key as keyof StudyGroup]
      const bValue = b[key as keyof StudyGroup]

      if (aValue === null || bValue === null) return 0

      let comparison = 0
      if (typeof aValue === 'string' && typeof bValue === 'string') {
        comparison = aValue.localeCompare(bValue)
      } else if (typeof aValue === 'number' && typeof bValue === 'number') {
        comparison = aValue - bValue
      }

      return isDescending ? -comparison : comparison
    })
  }, [studyGroups, sortKey])

  const handleSortChange = (key: string) => {
    setSortKey(key)
  }

  return {
    sortKey,
    sortedStudyGroups,
    handleSortChange,
  }
}
