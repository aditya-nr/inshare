import React from "react";

const IconButton = ({
  children,
  ...props
}: {
  children: React.ReactNode;
  onClick?: any;
  className?: string;
}) => {
  return (
    <div
      onClick={props.onClick}
      {...props}
      className={`rounded-full p-2 hover:bg-lime-50 w-max h-max cursor-pointer ${props.className}`}
    >
      {children}
    </div>
  );
};

export default IconButton;
