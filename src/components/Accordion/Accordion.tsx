import { forwardRef, useState, type ReactNode } from 'react'
import { ChevronDown } from 'lucide-react'

interface AccordionItemProps {
  value: string
  title: string
  children: ReactNode
}

export const AccordionItem = ({
  value,
  title,
  children,
}: AccordionItemProps) => {
  return (
    <div data-value={value} className="accordion-item border-b">
      <div className="accordion-title p-4 text-left font-medium">{title}</div>
      <div className="accordion-content p-4 pt-0">{children}</div>
    </div>
  )
}

// 한개씩의 목록만 열리는 singleType
interface AccordionSingleProps {
  type: 'single'
  defaultValue?: string
  onValueChange?: (value: string) => void
  children: ReactNode
}

const AccordionSingle = forwardRef<HTMLDivElement, AccordionSingleProps>(
  ({ defaultValue = '', onValueChange, children }, ref) => {
    const [openValue, setOpenValue] = useState(defaultValue)

    const handleToggle = (value: string) => {
      const newValue = openValue === value ? '' : value
      setOpenValue(newValue)
      onValueChange?.(newValue)
    }

    return (
      <div ref={ref} className="space-y-0">
        {Array.isArray(children)
          ? children.map((child, index) => (
              <div key={index}>
                <button
                  onClick={() => handleToggle(child.props.value)}
                  className="flex w-full items-center justify-between p-4 text-left hover:bg-gray-50"
                >
                  <span className="font-medium">{child.props.title}</span>
                  <ChevronDown
                    className={`h-5 w-5 transition-transform ${
                      openValue === child.props.value ? 'rotate-180' : ''
                    }`}
                  />
                </button>
                {openValue === child.props.value && (
                  <div className="p-4 pt-0">{child.props.children}</div>
                )}
              </div>
            ))
          : null}
      </div>
    )
  }
)

AccordionSingle.displayName = 'AccordionSingle'

// 동시의 여러 목록열리기 가능한 MultiType
interface AccordionMultiProps {
  type: 'multi'
  defaultValue?: string[]
  onValueChange?: (values: string[]) => void
  children: ReactNode
}

const AccordionMulti = forwardRef<HTMLDivElement, AccordionMultiProps>(
  ({ defaultValue = [], onValueChange, children }, ref) => {
    const [openValues, setOpenValues] = useState(defaultValue)

    const handleToggle = (value: string) => {
      const newValues = openValues.includes(value)
        ? openValues.filter((v) => v !== value)
        : [...openValues, value]

      setOpenValues(newValues)
      onValueChange?.(newValues)
    }

    return (
      <div ref={ref} className="space-y-0">
        {Array.isArray(children)
          ? children.map((child, index) => (
              <div key={index}>
                <button
                  onClick={() => handleToggle(child.props.value)}
                  className="flex w-full items-center justify-between p-4 text-left hover:bg-gray-50"
                >
                  <span className="font-medium">{child.props.title}</span>
                  <ChevronDown
                    className={`h-5 w-5 transition-transform ${
                      openValues.includes(child.props.value) ? 'rotate-180' : ''
                    }`}
                  />
                </button>
                {openValues.includes(child.props.value) && (
                  <div className="p-4 pt-0">{child.props.children}</div>
                )}
              </div>
            ))
          : null}
      </div>
    )
  }
)

AccordionMulti.displayName = 'AccordionMulti'

type AccordionProps = AccordionSingleProps | AccordionMultiProps

export const Accordion = forwardRef<HTMLDivElement, AccordionProps>(
  (props, ref) => {
    if (props.type === 'single') {
      return <AccordionSingle ref={ref} {...props} />
    }
    return <AccordionMulti ref={ref} {...props} />
  }
)

Accordion.displayName = 'Accordion'
