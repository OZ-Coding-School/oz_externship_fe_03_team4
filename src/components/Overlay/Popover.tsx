import { Info } from 'lucide-react';
import { useState, useRef, useLayoutEffect, useEffect, type ReactNode} from 'react';
import { createPortal } from 'react-dom';

interface PopoverProps {
  trigger: ReactNode;
  children: ReactNode;
  showIcon?: boolean;
}

const ensurePortalRoot = (): HTMLElement => {
  const existing = document.getElementById('portal-root');
  if (existing) return existing;

  const el = document.createElement('div');
  el.id = 'portal-root';
  document.body.appendChild(el);
  return el;
}

const Popover = ({ trigger, children, showIcon = true }: PopoverProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [top, setTop] = useState(0);
  const [left, setLeft] = useState(0);
  const triggerRef = useRef<HTMLDivElement>(null);
  const popoverRef = useRef<HTMLDivElement>(null);
  const portalRoot = ensurePortalRoot();

  useLayoutEffect(() => {
    if (!isOpen || !triggerRef.current || !popoverRef.current) return;

    const triggerRect = triggerRef.current.getBoundingClientRect();
    const popoverRect = popoverRef.current.getBoundingClientRect();

    const newTop = triggerRect.top + (triggerRect.height / 2) - (popoverRect.height / 2);
    let newLeft = triggerRect.right + 8;

    if (newLeft + popoverRect.width > window.innerWidth - 10) {
      newLeft = triggerRect.left - popoverRect.width - 8;
    }

    setTop(newTop);
    setLeft(newLeft);
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) return;

    const handleClickOutside = (e: MouseEvent) => {
      if (!popoverRef.current?.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isOpen]);

  const togglePopover = () => setIsOpen(prev => !prev);

  const popoverContent = (
    <div
      ref={popoverRef}
      className="fixed z-50 rounded-lg border bg-white p-4 shadow-xl"
      style={{ top: top + 'px', left: left + 'px' }}
    >
      <div className="flex items-start gap-3">
        {showIcon && <span className="text-blue-500">{<Info />}</span>}
        <div className="text-sm text-gray-700">{children}</div>
      </div>
    </div>
  );

  return (
    <>
      <div ref={triggerRef} onClick={togglePopover} className="inline-block cursor-pointer">
        {trigger}
      </div>
      {isOpen && createPortal(popoverContent, portalRoot)}
    </>
  );
}

export default Popover;