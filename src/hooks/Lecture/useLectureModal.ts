import { useState } from 'react'

export const useLectureModal = () => {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [selectedLectureId, setSelectedLectureId] = useState<number | null>(
    null
  )
  const openModal = (lectureId: number) => {
    setSelectedLectureId(lectureId)
    setIsModalOpen(true)
  }

  const closeModal = () => {
    setIsModalOpen(false)
    setSelectedLectureId(null)
  }

  return {
    isModalOpen,
    selectedLectureId,
    openModal,
    closeModal,
  }
}
