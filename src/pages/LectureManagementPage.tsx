import { useState } from 'react'
import type { Lecture } from '../types/lectureManagement/types'
import { mockLectures } from '../components/lecture/mockLecture'
import { SearchInput } from '../components/search/SearchInput'
import { LectureTable } from '../components/lecture/LectureTable'

export const LectureManagementPage = () => {
  const [search, setSearch] = useState('')
  const [lecture] = useState<Lecture[]>(mockLectures)

  const filteredLectures = lecture.filter((lecture) => {
    if (!search) return true
    return (
      lecture.title.toLowerCase().includes(search.toLowerCase()) ||
      lecture.instructor.toLowerCase().includes(search.toLowerCase())
    )
  })

  return (
    <div className="min-h-screen w-full bg-gray-50">
      <main className="mx-auto w-full max-w-7xl px-8 py-10">
        <h1 className="mb-6 text-xl font-semibold text-gray-900">강의 관리</h1>

        {/* 검색 */}
        <div className="mb-6 rounded-lg border border-gray-200 bg-white p-4 shadow-[0_3px_3px_rgba(0,0,0,0.05)]">
          <label className="mb-2 block text-sm font-medium text-gray-700">
            검색
          </label>
          <SearchInput
            placeholder="강의명, 강사명 검색..."
            value={search}
            onChangeText={setSearch}
            clearable
            className="max-w-md"
          />
        </div>

        {/* 테이블 */}
        <div className="overflow-hidden rounded-lg border border-gray-200 bg-white shadow-[0_3px_3px_rgba(0,0,0,0.05)]">
          <LectureTable lectures={filteredLectures} />
        </div>
      </main>
    </div>
  )
}
