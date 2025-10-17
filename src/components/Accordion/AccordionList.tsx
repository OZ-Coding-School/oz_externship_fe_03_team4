import { ChevronDown } from 'lucide-react'
import {
  forwardRef,
  useState,
  type ReactNode,
  Children,
  isValidElement,
} from 'react'

interface AccordionProps {
  defaultValue?: string
  onValueChange?: (value: string) => void
  children: ReactNode
}

interface AccordionChildProps {
  title: string
  children: ReactNode
}

const AccordionSingle = forwardRef<HTMLDivElement, AccordionProps>(
  ({ defaultValue = '', onValueChange, children }, ref) => {
    const [openValue, setOpenValue] = useState(defaultValue)

    const handleToggle = (value: string) => {
      const newValue = openValue === value ? '' : value
      setOpenValue(newValue)
      onValueChange?.(newValue)
    }

    const childrenArray = Children.toArray(children)

    return (
      <div ref={ref} className="rounded-lg border">
        {childrenArray.map((child, index) => {
          if (!isValidElement<AccordionChildProps>(child)) return null

          return (
            <div key={index}>
              <button
                onClick={() => handleToggle(String(index))}
                className="flex w-full items-center justify-between p-4 text-left hover:bg-gray-50"
              >
                <span className="font-medium">{child.props.title}</span>
                <ChevronDown
                  className={`h-5 w-5 transition-transform ${
                    openValue === String(index) ? 'rotate-180' : ''
                  }`}
                />
              </button>
              {openValue === String(index) && (
                <div className="border-t bg-gray-50 p-4">
                  {child.props.children}
                </div>
              )}
            </div>
          )
        })}
      </div>
    )
  }
)

AccordionSingle.displayName = 'AccordionSingle'

export const Accordion = forwardRef<HTMLDivElement, AccordionProps>(
  (props, ref) => <AccordionSingle ref={ref} {...props} />
)

Accordion.displayName = 'Accordion'
