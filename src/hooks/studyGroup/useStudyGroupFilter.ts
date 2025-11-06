import { useState } from 'react'
import {
  STUDY_GROUP_STATUS_OPTIONS,
  type StudyGroupUiStatus,
} from '../../types/studyGroup/types'

export const useStudyGroupFilter = () => {
  const [selectedStatus, setSelectedStatus] = useState<
    StudyGroupUiStatus | 'ALL'
  >('ALL')
  const [accordionValue, setAccordionValue] = useState('')

  const handleStatusChange = (status: StudyGroupUiStatus | 'ALL') => {
    setSelectedStatus(status)
    setAccordionValue('')
  }

  const resetFilter = () => {
    setSelectedStatus('ALL')
  }

  const selectedStatusLabel =
    STUDY_GROUP_STATUS_OPTIONS.find((opt) => opt.value === selectedStatus)
      ?.label || '전체'

  return {
    selectedStatus,
    accordionValue,
    selectedStatusLabel,
    handleStatusChange,
    setAccordionValue,
    resetFilter,
  }
}
