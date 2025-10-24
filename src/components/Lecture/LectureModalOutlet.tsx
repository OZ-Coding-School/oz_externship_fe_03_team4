// import type { LectureDetail } from '../../types/lectureManagement/types'
// import { LectureThumbnail } from './LectureThumbnail'

// interface LectureModalOutletProps {
//   lecture: LectureDetail
// }

// export const LectureModalOutlet = ({ lecture }: LectureModalOutletProps) => (
//   <div className="p-6">
//     <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
//       {/* 왼쪽: 썸네일 + 기본 정보 */}
//       <section className="space-y-4">
//         {/* 썸네일 */}
//         <div className="overflow-hidden rounded-lg border-2 border-blue-400">
//           <LectureThumbnail
//             src={lecture.thumbnail}
//             alt={lecture.title}
//           />
//         </div>

//         {/* 교육 ID */}
//         <div>
//           <p className="text-sm text-gray-600">교육 ID</p>
//           <p className="text-base font-medium">{lecture.id}</p>
//         </div>

//         {/* UUID */}
//         <div>
//           <p className="text-sm text-gray-600">UUID</p>
//           <p className="text-base font-mono text-sm">{lecture.uuid}</p>
//         </div>

//         {/* 강의명 */}
//         <div>
//           <p className="text-sm text-gray-600">강의명</p>
//           <p className="text-lg font-bold">{lecture.title}</p>
//         </div>

//         {/* 강사명 */}
//         <div>
//           <p className="text-sm text-gray-600">강사명</p>
//           <p className="text-base">{lecture.instructor}</p>
//         </div>

//         {/* 플랫폼 */}
//         <div>
//           <p className="text-sm text-gray-600">플랫폼</p>
//           <span className="mt-1 inline-block rounded bg-purple-100 px-3 py-1 text-sm font-medium text-purple-800">
//             {lecture.platform}
//           </span>
//         </div>

//         {/* 바로가기 링크 */}
//         <div>
//           <p className="text-sm text-gray-600">바로가기 링크</p>

//             href={lecture.url_link}
//             target="_blank"
//             rel="noopener noreferrer"
//             className="break-all text-sm text-blue-600 hover:underline"
//           >
//             {lecture.url_link}
//           </a>
//         </div>
//       </section>

//       {/* 오른쪽: 상세 정보 */}
//       <section className="space-y-4">
//         {/* 강의 설명 */}
//         <div className="rounded-lg bg-blue-50 p-4">
//           <h3 className="mb-2 text-sm font-semibold text-gray-700">강의 설명</h3>
//           <p className="text-sm leading-relaxed text-gray-800">
//             {lecture.description}
//           </p>
//         </div>

//         {/* 강의 난이도 */}
//         <div>
//           <p className="text-sm text-gray-600">강의 난이도</p>
//           <span className="mt-1 inline-block rounded bg-yellow-100 px-3 py-1 text-sm font-medium text-yellow-800">
//             {lecture.difficulty}
//           </span>
//           <span className="ml-2 text-sm text-gray-500">24:30</span>
//         </div>

//         {/* 가격 정보 */}
//         <div className="grid grid-cols-2 gap-4">
//           <div>
//             <p className="text-sm text-gray-600">월 가격</p>
//             <p className="text-base text-gray-400 line-through">
//               {lecture.originalPrice.toLocaleString()}원
//             </p>
//           </div>
//           <div>
//             <p className="text-sm text-gray-600">할인된 가격</p>
//             <p className="text-xl font-bold text-orange-500">
//               {lecture.discountPrice.toLocaleString()}원
//             </p>
//           </div>
//         </div>

//         {/* 카테고리 */}
//         <div>
//           <p className="mb-2 text-sm text-gray-600">해당 카테고리</p>
//           <div className="flex flex-wrap gap-2">
//             {lecture.categories.map((category, index) => (
//               <span
//                 key={index}
//                 className="rounded-full border border-gray-300 bg-white px-3 py-1 text-sm"
//               >
//                 {category}
//               </span>
//             ))}
//           </div>
//         </div>

//         {/* 날짜 정보 */}
//         <div className="grid grid-cols-2 gap-4">
//           <div>
//             <p className="text-sm text-gray-600">생성일시</p>
//             <p className="text-sm text-gray-800">{lecture.createdAt}</p>
//           </div>
//           <div>
//             <p className="text-sm text-gray-600">수정일시</p>
//             <p className="text-sm text-gray-800">{lecture.updatedAt}</p>
//           </div>
//         </div>
//       </section>
//     </div>

//     {/* 하단 버튼 */}
//     <div className="mt-6 flex justify-end">
//       <button className="rounded-lg bg-gray-500 px-6 py-2 text-white hover:bg-gray-600">
//         닫기
//       </button>
//     </div>
//   </div>
// )
