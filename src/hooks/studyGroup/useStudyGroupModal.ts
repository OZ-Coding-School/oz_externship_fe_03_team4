import { useState } from 'react'
import {
  mapStudyGroupDetailDTO,
  type StudyGroup,
  type StudyGroupDetail,
} from '../../types/studyGroup/types'
import { fetchStudyGroupDetail } from '../../api/fetchStudyGroups'
import { mockStudyGroupsData } from '../../components/studyGroup/mockStudyGroup'
import {
  generateMockDetailFromList,
  getMockStudyGroupDetail,
} from '../../components/studyGroup/mockStudyGroupDetail'

const USE_MOCK_DATA = true // 환경변수

export const useStudyGroupModal = () => {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [selectedStudyGroup, setSelectedStudyGroup] =
    useState<StudyGroupDetail | null>(null)
  const [isLoadingDetail, setIsLoadingDetail] = useState(false)

  const openModal = async (studyGroup: StudyGroup) => {
    setIsLoadingDetail(true)
    setIsModalOpen(true)

    try {
      if (USE_MOCK_DATA) {
        let detailDTO = getMockStudyGroupDetail(studyGroup.id)

        if (!detailDTO) {
          const listData = mockStudyGroupsData.find(
            (g) => g.id === studyGroup.id
          )
          if (listData) {
            detailDTO = generateMockDetailFromList(listData)
          }
        }

        if (detailDTO) {
          const detail = mapStudyGroupDetailDTO(detailDTO)
          setSelectedStudyGroup(detail)
        } else {
          setIsModalOpen(false)
        }
      } else {
        // 실제 API 호출
        const detailDTO = await fetchStudyGroupDetail(studyGroup.id)
        const detail = mapStudyGroupDetailDTO(detailDTO)
        setSelectedStudyGroup(detail)
      }
    } catch (error) {
      setIsModalOpen(false)
      setSelectedStudyGroup(null)
    } finally {
      setIsLoadingDetail(false)
    }
  }

  const closeModal = () => {
    setIsModalOpen(false)
    setSelectedStudyGroup(null)
  }

  return {
    isModalOpen,
    selectedStudyGroup,
    isLoadingDetail,
    openModal,
    closeModal,
  }
}
