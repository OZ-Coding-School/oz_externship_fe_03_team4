import { useState } from 'react'
import { Accordion } from '../../components/Accordion/AccordionList'
import {
  AccordionListContent,
  type ListItem,
} from '../../components/Accordion/AccordionItem'

export const AccordionTest = () => {
  const [selectedItem, setSelectedItem] = useState<ListItem | null>(null)

  const allItems = [
    { id: '1', label: '전체', status: 'pending' },
    { id: '2', label: '완료됨', status: 'approved' },
    { id: '3', label: '대기중', status: 'pending' },
    { id: '4', label: '승인중', status: 'approved' },
  ]

  return (
    <Accordion defaultValue="0">
      <div title={selectedItem?.label || ''}>
        <AccordionListContent items={allItems} onSelectItem={setSelectedItem} />
      </div>
    </Accordion>
  )
}
