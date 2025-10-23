// import { useMemo, useRef, useState } from 'react'
// import { VideoProgress } from '../../components/Progress/VideoProgress'
// import {
//   VideoGroupProgress,
//   type VideoProgressData,
// } from '../../components/Progress/VideoGroupProgress'
// import { LectureManagementPage } from '../lectureManagement/LectureManagementPage'
// import { CourseTable } from '../CourseManagementPage/CourseTable'
// import { SearchInput } from '../../components/search/SearchInput'
// import { useDebouncedValue } from '../../hooks/useDebouncedValue'

import { LectureManagementPage } from '../LectureManagementPage'

// import { useState } from 'react'
// import { Accordion } from '../../components/Accordion/Accordion'
// import {
//   AccordionItem,
//   type ListItem,
// } from '../../components/Accordion/AccordionType'
// import { AccordionList } from '../../components/Accordion/AccordionList'
// import { ToastContainer } from '../../components/toast/toastContainer'
// import { useToastStore } from '../../store/toastStore'

// export default function AccordionTest() {
//   const [selectedSection, setSelectedSection] = useState('')
//   const { showSuccess, showError, showWarning, showInfo } = useToastStore()
//   const [selectedLabels, setSelectedLabels] = useState<Record<string, string>>(
//     {}
//   )

//   // 필요한 아코디언 목록을 아래처럼 const = ...Items 만들어서 items={....}에 담아서 렌더링
//   const filterItems: ListItem[] = [
//     { id: '0', label: '전체' },
//     { id: '1', label: '연별' },
//     { id: '2', label: '월별' },
//     { id: '3', label: '일별' },
//   ]

//   const serviceItems: ListItem[] = [
//     { id: '4', label: '전체' },
//     { id: '5', label: '서비스 만족' },
//     { id: '6', label: '서비스 불만족' },
//   ]

//   const stateItems: ListItem[] = [
//     { id: '7', label: '전체' },
//     { id: '8', label: '활성' },
//     { id: '9', label: '비활성' },
//   ]

//   const authItems: ListItem[] = [
//     { id: '10', label: '전체' },
//     { id: '11', label: '일반회원' },
//     { id: '12', label: '스태프' },
//     { id: '13', label: '관리자' },
//   ]

//   const handleSelectItem = (item: ListItem, sectionIndex: string) => {
//     setSelectedLabels((prev) => ({
//       ...prev,
//       [sectionIndex]: item.label,
//     }))
//     setSelectedSection('')
//   }

//   return (
//     <aside className="flex min-h-screen flex-col border-gray-200 bg-white p-4">
//       <nav>
//         {/**
//          * defaultValue : 초기값
//          * value : 현재 열린 섹션
//          * onValueChange : 상태 변경 핸들러
//          * selectedLabels : 선택된 라벨 맵
//          */}
//         <Accordion
//           defaultValue=""
//           value={selectedSection}
//           onValueChange={setSelectedSection}
//           selectedLabels={selectedLabels}
//         >
//           <AccordionItem title="차트 설정">
//             <AccordionList
//               items={filterItems}
//               onSelectItem={(item) => handleSelectItem(item, '0')}
//             />
//           </AccordionItem>

//           <AccordionItem title="서비스 만족도">
//             <AccordionList
//               items={serviceItems}
//               onSelectItem={(item) => handleSelectItem(item, '1')}
//             />
//           </AccordionItem>

//           <AccordionItem title="상태 설정">
//             <AccordionList
//               items={stateItems}
//               onSelectItem={(item) => handleSelectItem(item, '2')}
//             />
//           </AccordionItem>

//           <AccordionItem title="권한 설정">
//             <AccordionList
//               items={authItems}
//               onSelectItem={(item) => handleSelectItem(item, '3')}
//             />
//           </AccordionItem>
//         </Accordion>
//       </nav>
//       {/**토스트 알림창 */}
//       <div className="h-full w-full">
//         <ToastContainer />

//         <div className="flex flex-col">
//           <h1>Toast 테스트</h1>

//           <div className="flex flex-col gap-10">
//             <button
//               className="bg-gray cursor-pointer"
//               onClick={() =>
//                 showSuccess('성공', '작업이 성공적으로 완료되었습니다.')
//               }
//             >
//               Success
//             </button>

//             <button
//               className="bg-gray cursor-pointer"
//               onClick={() => showError('오류', '오류가 발생했습니다.')}
//             >
//               Error
//             </button>

//             <button
//               className="bg-gray cursor-pointer"
//               onClick={() => showWarning('경고', '주의가 필요한 상황입니다.')}
//             >
//               Warning
//             </button>

//             <button
//               className="bg-gray cursor-pointer"
//               onClick={() => showInfo('정보', '정보 메시지입니다.')}
//             >
//               Info
//             </button>
//           </div>
//         </div>
//       </div>
//     </aside>
//   )
// }

/************************************/

// const video1Ref = useRef<HTMLVideoElement>(null)
//   const video2Ref = useRef<HTMLVideoElement>(null)
//   const video3Ref = useRef<HTMLVideoElement>(null)

//   const [videosProgress, setVideosProgress] = useState<VideoProgressData[]>([
//     { videoId: 'video-1', progress: 0, duration: 600, completed: false },
//     { videoId: 'video-2', progress: 0, duration: 900, completed: false },
//     { videoId: 'video-3', progress: 0, duration: 300, completed: false },
//   ])

//   const handleVideoProgress = (videoId: string) => (progress: number) => {
//     setVideosProgress((prev) =>
//       prev.map((v) =>
//         v.videoId === videoId
//           ? {
//               ...v,
//               progress,
//               completed: progress >= 97,
//             }
//           : v
//       )
//     )
//   }

//   return (
//     <div className="min-h-screen p-8">
//       <div className="mx-auto space-y-8">
//         <section>
//           <h2 className="mb-4 text-lg font-semibold text-gray-900">
//             강의 전체 진행률
//           </h2>
//           <VideoGroupProgress videos={videosProgress} showLabel />
//         </section>

//         {/* 동영상 1 */}
//         <section>
//           <h3 className="mb-2 font-semibold text-gray-900">동영상 1</h3>
//           <video ref={video1Ref} controls className="mb-4 w-full">
//             <source
//               src="https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4"
//               type="video/mp4"
//             />
//           </video>
//           <VideoProgress
//             videoRef={video1Ref}
//             showLabel
//             onProgressChange={handleVideoProgress('video-1')}
//           />
//         </section>

//         {/* 동영상 2 */}
//         <section>
//           <h3 className="mb-2 font-semibold text-gray-900">동영상 2</h3>
//           <video ref={video2Ref} controls className="mb-4 w-full">
//             <source
//               src="https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4"
//               type="video/mp4"
//             />
//           </video>
//           <VideoProgress
//             videoRef={video2Ref}
//             showLabel
//             onProgressChange={handleVideoProgress('video-2')}
//           />
//         </section>

//         {/* 동영상 3 */}
//         <section>
//           <h3 className="mb-2 font-semibold text-gray-900">동영상 3</h3>
//           <video ref={video3Ref} controls className="mb-4 w-full">
//             <source
//               src="https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4"
//               type="video/mp4"
//             />
//           </video>
//           <VideoProgress
//             videoRef={video3Ref}
//             showLabel
//             onProgressChange={handleVideoProgress('video-3')}
//           />
//         </section>
//       </div>
//     </div>
//   )
// }

/** 테스트 페이지의 진입 컴포넌트 (default export 하나만 유지) */
export default function TestPage() {
  return (
    <div>
      <LectureManagementPage />
    </div>
  )
}
