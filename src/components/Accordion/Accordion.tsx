import { Children, forwardRef, isValidElement, useState } from 'react'
import type { AccordionItemProps, AccordionProps } from './AccordionType'
import { ChevronDown } from 'lucide-react'

export const Accordion = forwardRef<HTMLDivElement, AccordionProps>(
  (
    { defaultValue = '', value, onValueChange, selectedLabels = {}, children },
    ref
  ) => {
    const [internalValue, setInternalValue] = useState(defaultValue)
    const openValue = value !== undefined ? value : internalValue

    const handleToggle = (value: string) => {
      const newValue = openValue === value ? '' : value
      if (value === undefined) {
        setInternalValue(newValue)
      }
      onValueChange?.(newValue)
    }

    const childrenArray = Children.toArray(children)

    return (
      <div
        ref={ref}
        className="flex flex-col gap-3 text-[14px] font-medium text-gray-700"
      >
        {childrenArray.map((child, index) => {
          if (!isValidElement<AccordionItemProps>(child)) return null
          const itemValue = String(index)
          const displayText = selectedLabels[itemValue] || child.props.title

          return (
            <div key={index}>
              <div
                onClick={() => handleToggle(itemValue)}
                className="flex cursor-pointer items-center justify-between rounded-lg border border-gray-200 bg-[#EFEFEF] px-3 py-3 transition-colors select-none hover:bg-gray-50"
              >
                <span className="font-medium text-gray-900">{displayText}</span>
                <ChevronDown
                  size={16}
                  className={`text-gray-400 transition-transform duration-200 ${
                    openValue === itemValue ? 'rotate-180' : 'rotate-0'
                  }`}
                />
              </div>

              {openValue === itemValue && (
                <div className="my-2">{child.props.children}</div>
              )}
            </div>
          )
        })}
      </div>
    )
  }
)

Accordion.displayName = 'Accordion'
