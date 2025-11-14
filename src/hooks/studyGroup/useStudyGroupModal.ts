import { useState } from 'react'
import { type StudyGroup } from '../../types/studyGroup/types'
import { useQuery } from '@tanstack/react-query'
import { fetchStudyGroupDetail } from '../../api/fetchStudyGroups'

export const useStudyGroupModal = () => {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [selectedUuid, setSelectedUuid] = useState<string | null>(null)

  // 상세 조회 Query
  const { data: selectedStudyGroup, isLoading: isLoadingDetail } = useQuery({
    queryKey: ['studyGroupDetail', selectedUuid],
    queryFn: () => fetchStudyGroupDetail(selectedUuid!),
    enabled: !!selectedUuid && isModalOpen,
  })

  const openModal = (studyGroup: StudyGroup) => {
    setSelectedUuid(studyGroup.uuid)
    setIsModalOpen(true)
  }

  const closeModal = () => {
    setIsModalOpen(false)
    setSelectedUuid(null)
  }

  return {
    isModalOpen,
    selectedStudyGroup: selectedStudyGroup ?? null,
    isLoadingDetail,
    openModal,
    closeModal,
  }
}
