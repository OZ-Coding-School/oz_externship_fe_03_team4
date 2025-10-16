import React from "react";
import RoundBox from "./Roundbox";

interface ModalProps extends Record<string, unknown> {
  isOn: boolean;
  onBackgroundClick: () => void;
  children: React.ReactNode;
}

const Modal: React.FC<ModalProps> = ({
  isOn,
  onBackgroundClick,
  children,
  ...props
}) => {
  if (!isOn) return null;

  const handleContentClick = (event: React.MouseEvent) => {
    event.stopPropagation();
  };

  return (
    <div
      onClick={onBackgroundClick}
      className="
        fixed inset-0 z-[90]
        w-screen h-screen
        flex flex-col justify-center items-center
        bg-gray-500/50
      "
    >
      <RoundBox
        padding="lg"
        {...props}
        onClick={handleContentClick}
        className="relative z-[91]"
      >
        {children}
      </RoundBox>
    </div>
  );
};

export default Modal;