import { useState } from 'react'
import type { Lecture } from '../../types/lectureManagement/types'

export const useLectureModal = () => {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [selectedLecture, setSelectedLecture] = useState<Lecture | null>(null)

  const openModal = (lecture: Lecture) => {
    setSelectedLecture(lecture)
    setIsModalOpen(true)
  }

  const closeModal = () => {
    setIsModalOpen(false)
    setSelectedLecture(null)
  }

  return {
    isModalOpen,
    selectedLecture,
    openModal,
    closeModal,
  }
}
