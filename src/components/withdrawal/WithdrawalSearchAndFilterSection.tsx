import { useState } from 'react'
import { SearchInput } from '../search/SearchInput'
import { Accordion } from '../Accordion/Accordion'
import { AccordionItem } from '../Accordion/AccordionType'
import {
  ROLE_CODE_TO_LABEL,
  WITHDRAW_REASONS,
} from '../../constants/withdrawal'

interface WithdrawalSearchAndFilterSectionProps {
  search: string
  onSearchChange: (value: string) => void
  withdrawReasonFilter: string
  onReasonFilterChange: (value: string) => void
  withdrawRoleFilter: string
  onRoleFilterChange: (value: string) => void
}

export const WithdrawalSearchAndFilterSection = ({
  search,
  onSearchChange,
  withdrawReasonFilter,
  onReasonFilterChange,
  withdrawRoleFilter,
  onRoleFilterChange,
}: WithdrawalSearchAndFilterSectionProps) => {
  const [reasonAccordion, setReasonAccordion] = useState<string>('')
  const [roleAccordion, setRoleAccordion] = useState<string>('')

  return (
    <div className="my-6 flex flex-col items-start gap-4 rounded-lg border border-gray-200 bg-white p-4 sm:flex-row sm:items-start">
      <div className="max-w-full min-w-[200px] flex-1">
        <SearchInput
          placeholder="탈퇴요청 ID, 이메일, 이름 검색..."
          value={search}
          onChangeText={onSearchChange}
          clearable
          className="w-full"
        />
      </div>

      {/* 탈퇴 사유 필터 */}
      <div className="relative w-40">
        <Accordion
          value={reasonAccordion}
          onValueChange={setReasonAccordion}
          selectedLabels={{ '0': withdrawReasonFilter || '전체 탈퇴 사유' }}
        >
          <AccordionItem title="탈퇴 사유">
            {reasonAccordion === '0' && (
              <div className="mt-2 -mb-2">
                <div className="absolute top-full right-0 left-0 z-20 mt-2 max-h-80 overflow-auto rounded-lg border bg-white p-3 shadow-lg">
                  <button
                    className="w-full px-3 py-2 text-left text-sm hover:bg-gray-50"
                    onClick={() => {
                      onReasonFilterChange('')
                      setReasonAccordion('')
                    }}
                  >
                    전체 탈퇴 사유
                  </button>
                  {WITHDRAW_REASONS.map((reason) => (
                    <button
                      key={reason}
                      className="w-full px-3 py-2 text-left text-sm hover:bg-gray-50"
                      onClick={() => {
                        onReasonFilterChange(reason)
                        setReasonAccordion('')
                      }}
                    >
                      {reason}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </AccordionItem>
        </Accordion>
      </div>

      {/* 탈퇴 권한 필터 */}
      <div className="relative w-40">
        <Accordion
          value={roleAccordion}
          onValueChange={setRoleAccordion}
          selectedLabels={{ '0': withdrawRoleFilter || '전체 권한' }}
        >
          <AccordionItem title="탈퇴 권한">
            {roleAccordion === '0' && (
              <div className="mt-2 -mb-2">
                <div className="absolute top-full right-0 left-0 z-20 mt-2 max-h-80 overflow-auto rounded-lg border bg-white p-3 shadow-lg">
                  <button
                    className="w-full px-3 py-2 text-left text-sm hover:bg-gray-50"
                    onClick={() => {
                      onRoleFilterChange('')
                      setRoleAccordion('')
                    }}
                  >
                    전체 권한
                  </button>
                  {Object.entries(ROLE_CODE_TO_LABEL).map(([code, label]) => (
                    <button
                      key={code}
                      className="w-full px-3 py-2 text-left text-sm hover:bg-gray-50"
                      onClick={() => {
                        onRoleFilterChange(label)
                        setRoleAccordion('')
                      }}
                    >
                      {label}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </AccordionItem>
        </Accordion>
      </div>
    </div>
  )
}
