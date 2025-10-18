import { useState } from 'react'
import { Accordion } from '../../components/Accordion/Accordion'
import {
  AccordionItem,
  type ListItem,
} from '../../components/Accordion/AccordionType'
import { AccordionList } from '../../components/Accordion/AccordionList'

export default function AccordionTest() {
  const [selectedSection, setSelectedSection] = useState('')
  const [selectedLabels, setSelectedLabels] = useState<Record<string, string>>(
    {}
  )

  // 필요한 아코디언 목록을 아래처럼 const = ...Items 만들어서 items={....}에 담아서 렌더링
  const filterItems: ListItem[] = [
    { id: '0', label: '전체' },
    { id: '1', label: '연별' },
    { id: '2', label: '월별' },
    { id: '3', label: '일별' },
  ]

  const serviceItems: ListItem[] = [
    { id: '4', label: '전체' },
    { id: '5', label: '서비스 만족' },
    { id: '6', label: '서비스 불만족' },
  ]

  const stateItems: ListItem[] = [
    { id: '7', label: '전체' },
    { id: '8', label: '활성' },
    { id: '9', label: '비활성' },
  ]

  const authItems: ListItem[] = [
    { id: '10', label: '전체' },
    { id: '11', label: '일반회원' },
    { id: '12', label: '스태프' },
    { id: '13', label: '관리자' },
  ]

  const handleSelectItem = (item: ListItem, sectionIndex: string) => {
    setSelectedLabels((prev) => ({
      ...prev,
      [sectionIndex]: item.label,
    }))
    setSelectedSection('')
  }

  return (
    <aside className="flex min-h-screen flex-col border-gray-200 bg-white p-4">
      <nav>
        {/**
         * defaultValue : 초기값
         * value : 현재 열린 섹션
         * onValueChange : 상태 변경 핸들러
         * selectedLabels : 선택된 라벨 맵
         */}
        <Accordion
          defaultValue=""
          value={selectedSection}
          onValueChange={setSelectedSection}
          selectedLabels={selectedLabels}
        >
          <AccordionItem title="차트 설정">
            <AccordionList
              items={filterItems}
              onSelectItem={(item) => handleSelectItem(item, '0')}
            />
          </AccordionItem>

          <AccordionItem title="서비스 만족도">
            <AccordionList
              items={serviceItems}
              onSelectItem={(item) => handleSelectItem(item, '1')}
            />
          </AccordionItem>

          <AccordionItem title="상태 설정">
            <AccordionList
              items={stateItems}
              onSelectItem={(item) => handleSelectItem(item, '2')}
            />
          </AccordionItem>

          <AccordionItem title="권한 설정">
            <AccordionList
              items={authItems}
              onSelectItem={(item) => handleSelectItem(item, '3')}
            />
          </AccordionItem>
        </Accordion>
      </nav>
    </aside>
  )
}
