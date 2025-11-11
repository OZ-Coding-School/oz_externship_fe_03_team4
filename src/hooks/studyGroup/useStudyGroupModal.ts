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
    console.log('🔵 openModal 호출됨:', studyGroup.uuid)
    setSelectedUuid(studyGroup.uuid)
    setIsModalOpen(true)
  }

  const closeModal = () => {
    console.log('🔴 closeModal 호출됨')
    setIsModalOpen(false)
    // UUID는 즉시 초기화하지 않고 약간의 지연 후 초기화 (모달 닫히는 애니메이션 고려)
    setTimeout(() => {
      setSelectedUuid(null)
    }, 300)
  }

  console.log('📊 현재 모달 상태:', {
    isModalOpen,
    selectedUuid,
    hasData: !!selectedStudyGroup,
    isLoadingDetail,
  })

  return {
    isModalOpen,
    selectedStudyGroup: selectedStudyGroup ?? null,
    isLoadingDetail,
    openModal,
    closeModal,
  }
}
