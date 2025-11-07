import { useMemo } from 'react'
import {
  mapStudyGroupDTO,
  type StudyGroup,
  type StudyGroupUiStatus,
} from '../../types/studyGroup/types'
import { mockStudyGroupsData } from '../../components/studyGroup/mockStudyGroup'

interface UseStudyGroupDataProps {
  searchText: string
  selectedStatus: StudyGroupUiStatus | 'ALL'
}

const USE_MOCK_DATA = true // 환경변수

export const useStudyGroupData = ({
  searchText,
  selectedStatus,
}: UseStudyGroupDataProps) => {
  // TODO: React Query로 교체
  const studyGroups = useMemo(() => {
    if (USE_MOCK_DATA) {
      return mockStudyGroupsData.map(mapStudyGroupDTO)
    }
    // return useStudyGroupsQuery().data ?? []
    return []
  }, [])

  const filteredStudyGroups = useMemo((): StudyGroup[] => {
    let filtered = studyGroups

    // 검색 필터
    if (searchText.trim()) {
      const lowerSearch = searchText.trim().toLowerCase()
      filtered = filtered.filter((group) =>
        group.name.toLowerCase().includes(lowerSearch)
      )
    }

    // 상태 필터
    if (selectedStatus !== 'ALL') {
      filtered = filtered.filter((group) => group.status === selectedStatus)
    }

    return filtered
  }, [studyGroups, searchText, selectedStatus])

  return {
    studyGroups,
    filteredStudyGroups,
  }
}

// import { useMemo } from 'react'
// import {
//   mapStudyGroupDTO,
//   type StudyGroup,
//   type StudyGroupUiStatus,
// } from '../../types/studyGroup/types'
// import { mockStudyGroupsData } from '../../components/studyGroup/mockStudyGroup'

// interface UseStudyGroupDataProps {
//   searchText: string
//   selectedStatus: StudyGroupUiStatus | 'ALL'
// }

// const USE_MOCK_DATA = true // 환경변수

// export const useStudyGroupData = ({
//   searchText,
//   selectedStatus,
// }: UseStudyGroupDataProps) => {
//   // TODO: React Query로 교체
//   const studyGroups = useMemo(() => {
//     if (USE_MOCK_DATA) {
//       return mockStudyGroupsData.map(mapStudyGroupDTO)
//     }
//     // return useStudyGroupsQuery().data ?? []
//     return []
//   }, [])

//   const filteredStudyGroups = useMemo((): StudyGroup[] => {
//     let filtered = studyGroups

//     // 검색 필터
//     if (searchText.trim()) {
//       const lowerSearch = searchText.trim().toLowerCase()
//       filtered = filtered.filter((group) =>
//         group.name.toLowerCase().includes(lowerSearch)
//       )
//     }

//     // 상태 필터
//     if (selectedStatus !== 'ALL') {
//       filtered = filtered.filter((group) => group.status === selectedStatus)
//     }

//     return filtered
//   }, [studyGroups, searchText, selectedStatus])

//   return {
//     studyGroups,
//     filteredStudyGroups,
//   }
// }
