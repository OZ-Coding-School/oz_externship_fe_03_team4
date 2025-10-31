import type { StudyGroupDetailDTO } from '../../types/studyGroup/types'

export const mockStudyGroupDetailData: Record<number, StudyGroupDetailDTO> = {
  1: {
    id: 1,
    uuid: 'group-uuid-001',
    name: 'Spring Boot 실무 스터디',
    current_headcount: 6,
    max_headcount: 10,
    members: [
      { nickname: 'SpringMaster', is_leader: true },
      { nickname: 'JavaExpert', is_leader: false },
      { nickname: 'BackendDev', is_leader: false },
      { nickname: 'DBArchitect', is_leader: false },
      { nickname: 'APIDesigner', is_leader: false },
      { nickname: 'CodeReviewer', is_leader: false },
    ],
    profile_img_url:
      'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=400',
    start_at: '2024-03-15',
    end_at: '2024-06-15',
    status: 'PENDING',
    lectures: [
      {
        thumbnail_img_url:
          'https://images.unsplash.com/photo-1587620962725-abab7fe55159?w=300',
        title: 'Spring Boot 기초',
        instructor: '김철수',
        url_link: 'https://example.com/lecture/spring-boot-basic',
      },
      {
        thumbnail_img_url:
          'https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=300',
        title: 'Spring Security',
        instructor: '김철수',
        url_link: 'https://example.com/lecture/spring-security',
      },
      {
        thumbnail_img_url:
          'https://images.unsplash.com/photo-1516116216624-53e697fedbea?w=300',
        title: 'JPA 실전',
        instructor: '김철수',
        url_link: 'https://example.com/lecture/jpa-practical',
      },
    ],
    created_at: '2024-02-20T09:00:00Z',
    updated_at: '2024-03-01T14:30:00Z',
  },
  2: {
    id: 2,
    uuid: 'group-uuid-002',
    name: 'React 마스터 스터디',
    current_headcount: 8,
    max_headcount: 12,
    members: [
      { nickname: 'ReactPro', is_leader: true },
      { nickname: 'HooksMaster', is_leader: false },
      { nickname: 'StateManager', is_leader: false },
      { nickname: 'ComponentKing', is_leader: false },
      { nickname: 'FrontendDev', is_leader: false },
      { nickname: 'UIBuilder', is_leader: false },
      { nickname: 'ReduxNinja', is_leader: false },
      { nickname: 'TypeScriptLover', is_leader: false },
    ],
    profile_img_url:
      'https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=400',
    start_at: '2024-02-01',
    end_at: '2024-04-30',
    status: 'ACTIVE',
    lectures: [
      {
        thumbnail_img_url:
          'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=300',
        title: 'React 기초',
        instructor: '이영희',
        url_link: 'https://example.com/lecture/react-basic',
      },
      {
        thumbnail_img_url:
          'https://images.unsplash.com/photo-1581093588401-22e8c22eab21?w=300',
        title: 'React Hooks',
        instructor: '이영희',
        url_link: 'https://example.com/lecture/react-hooks',
      },
    ],
    created_at: '2024-01-15T10:20:00Z',
    updated_at: '2024-02-10T16:45:00Z',
  },
  3: {
    id: 3,
    uuid: 'group-uuid-003',
    name: 'AI 개발자 되기 스터디',
    current_headcount: 15,
    max_headcount: 15,
    members: [
      { nickname: 'AIResearcher', is_leader: true },
      { nickname: 'DataScientist', is_leader: false },
      { nickname: 'MLEngineer', is_leader: false },
      { nickname: 'PythonExpert', is_leader: false },
      { nickname: 'TensorFlowDev', is_leader: false },
      { nickname: 'PyTorchMaster', is_leader: false },
      { nickname: 'NeuralNetDev', is_leader: false },
      { nickname: 'DeepLearner', is_leader: false },
      { nickname: 'ModelTrainer', is_leader: false },
      { nickname: 'DataAnalyst', is_leader: false },
      { nickname: 'AlgoExpert', is_leader: false },
      { nickname: 'StatsPro', is_leader: false },
      { nickname: 'VisionAI', is_leader: false },
      { nickname: 'NLPSpecialist', is_leader: false },
      { nickname: 'AIEthicist', is_leader: false },
    ],
    profile_img_url:
      'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=400',
    start_at: '2024-01-01',
    end_at: '2024-01-31',
    status: 'COMPLETED',
    lectures: [
      {
        thumbnail_img_url:
          'https://images.unsplash.com/photo-1526378722484-cc2c4a0b69f4?w=300',
        title: 'Python ML 기초',
        instructor: '박민수',
        url_link: 'https://example.com/lecture/python-ml-basic',
      },
      {
        thumbnail_img_url:
          'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=300',
        title: 'Deep Learning',
        instructor: '박민수',
        url_link: 'https://example.com/lecture/deep-learning',
      },
      {
        thumbnail_img_url:
          'https://images.unsplash.com/photo-1620712943543-bcc4688e7485?w=300',
        title: 'PyTorch 실전',
        instructor: '박민수',
        url_link: 'https://example.com/lecture/pytorch-practical',
      },
    ],
    created_at: '2023-12-10T08:00:00Z',
    updated_at: '2024-01-31T18:00:00Z',
  },
}

export const getMockStudyGroupDetail = (
  id: number
): StudyGroupDetailDTO | null => {
  return mockStudyGroupDetailData[id] || null
}

/**
 * 목록 데이터로부터 상세 데이터를 생성하는 헬퍼 함수
 * mockStudyGroupsData의 다른 항목들도 상세 조회 가능하도록
 */
export const generateMockDetailFromList = (
  listItem: any
): StudyGroupDetailDTO => {
  // 기본 멤버 생성 (리더 1명 + 나머지는 일반 멤버)
  const memberCount = listItem.current_headcount
  const members = Array.from({ length: memberCount }, (_, index) => ({
    nickname: index === 0 ? 'Leader' : `Member${index}`,
    is_leader: index === 0,
  }))

  const lectures = listItem.lectures.map((lecture: any, index: number) => ({
    thumbnail_img_url: `https://images.unsplash.com/photo-${1500000000000 + index}?w=300`,
    title: lecture.title,
    instructor: lecture.instructor,
    url_link: `https://example.com/lecture/${lecture.id}`,
  }))

  return {
    id: listItem.id,
    uuid: `group-uuid-${String(listItem.id).padStart(3, '0')}`,
    name: listItem.name,
    current_headcount: listItem.current_headcount,
    max_headcount: listItem.max_headcount,
    members,
    profile_img_url: listItem.profile_img_url,
    start_at: listItem.start_at,
    end_at: listItem.end_at,
    status: listItem.status,
    lectures,
    created_at: listItem.created_at,
    updated_at: listItem.updated_at,
  }
}
