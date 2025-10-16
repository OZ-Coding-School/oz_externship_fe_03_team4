import React from "react";

interface RoundBoxProps {
  children: React.ReactNode;
  padding?: "sm" | "md" | "lg";
  className?: string;
  [key: string]: unknown;
}

const paddingMap = {
  sm: "p-3",
  md: "p-5",
  lg: "p-8",
};

const RoundBox: React.FC<RoundBoxProps> = ({
  children,
  padding = "md",
  className = "",
  ...rest
}) => {
  return (
    <div
      className={`bg-white rounded-2xl shadow-md ${paddingMap[padding]} ${className}`}
      {...rest}
    >
      {children}
    </div>
  );
};

export default RoundBox;