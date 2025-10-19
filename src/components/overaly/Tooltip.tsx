import { useState, useRef, useLayoutEffect, type ReactNode } from 'react';
import { createPortal } from 'react-dom';

interface TooltipProps {
  content: string;
  children: ReactNode;
  position?: 'top' | 'bottom';
}

const Tooltip = ({ 
  content, 
  children, 
  position = 'top'
}: TooltipProps) => {
  const [isShow, setIsShow] = useState(false);
  const [tooltipTop, setTooltipTop] = useState(0);
  const [tooltipLeft, setTooltipLeft] = useState(0);
  const buttonRef = useRef<HTMLDivElement>(null);
  const tooltipRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    if (!isShow) return;
    if (!buttonRef.current) return;
    if (!tooltipRef.current) return;

    const buttonRect = buttonRef.current.getBoundingClientRect();
    const tooltipRect = tooltipRef.current.getBoundingClientRect();
    
    let newTop = 0;
    let newLeft = 0;

    if (position === 'top') {
      newTop = buttonRect.top - tooltipRect.height - 8;
      newLeft = buttonRect.left + (buttonRect.width / 2) - (tooltipRect.width / 2);
    } else {
      newTop = buttonRect.bottom + 8;
      newLeft = buttonRect.left + (buttonRect.width / 2) - (tooltipRect.width / 2);
    }

    if (newLeft < 10) {
      newLeft = 10;
    }
    if (newLeft + tooltipRect.width > window.innerWidth - 10) {
      newLeft = window.innerWidth - tooltipRect.width - 10;
    }

    setTooltipTop(newTop);
    setTooltipLeft(newLeft);
  });

  let portalElement = document.getElementById('portal-root');
  if (!portalElement) {
    portalElement = document.createElement('div');
    portalElement.id = 'portal-root';
    document.body.appendChild(portalElement);
  }

  return (
    <>
      <div
        ref={buttonRef}
        onMouseEnter={() => setIsShow(true)}
        onMouseLeave={() => setIsShow(false)}
        className="inline-block"
      >
        {children}
      </div>
      
      {isShow && createPortal(
        <div
          ref={tooltipRef}
          className="fixed z-50 px-3 py-1.5 text-xs font-medium text-white bg-gray-900 rounded-md shadow-lg pointer-events-none"
          style={{ top: tooltipTop + 'px', left: tooltipLeft + 'px' }}
        >
          {content}
        </div>,
        portalElement
      )}
    </>
  );
}

export default Tooltip;