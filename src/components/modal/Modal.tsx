import React from 'react'
import RoundBox from './Roundbox'
import { ModalHeader } from './ModalHeader'
import { CloseModalFooter } from './CloseModalFooter'

interface ModalProps {
  isOn: boolean
  children: React.ReactNode
  className?: string
  onBackgroundClick?: () => void // 커스텀 이벤트는 여기서만 사용
}

const Modal = ({
  isOn,
  children,
  className,
}: ModalProps) => {
  if (!isOn) return null

  const handleContentClick = (event: React.MouseEvent) => {
    event.stopPropagation()
  }

  // children을 배열로 변환
  const childrenArray = React.Children.toArray(children)

  // 타입이 ReactElement인 요소만 필터링
  const elements = childrenArray.filter(
    (child): child is React.ReactElement => React.isValidElement(child)
  )

  // header / footer 자동 분리
  const header = elements.find(child => child.type === ModalHeader)
  const footer = elements.find(child => child.type === CloseModalFooter)
  const body = elements.filter(
    child => child.type !== ModalHeader && child.type !== CloseModalFooter
  )

  return (
    <div
      className="fixed inset-0 z-[90] flex items-center justify-center bg-gray-500/50"
      role="dialog"
      aria-modal="true"
    >
      <RoundBox
        onClick={handleContentClick} // 내용 클릭 시 모달 닫히지 않게
        className={[
          'relative z-[91] max-h-[85vh]',
          'flex flex-col rounded-2xl bg-white shadow-xl',
          className,
        ].join(' ')}
        padding="lg"
      >
        {header && (
          <div className="sticky top-0 -mx-6 -mt-6 shrink-0 bg-white/90 px-6 pt-5 pb-3 mb-1 backdrop-blur">
            {header}
          </div>
        )}

        <div className="scrollbar-hide flex-1 overflow-y-auto pt-2">{body}</div>

        {footer && (
          <div className="sticky bottom-0 -mx-6 -mb-6 shrink-0 bg-white/90 px-6 pt-3 pb-6 backdrop-blur">
            {footer}
          </div>
        )}
      </RoundBox>
    </div>
  )
}

export default Modal