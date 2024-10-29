import React, { memo } from "react";

type CommonButtonProps = {
  children: React.ReactNode;
} & React.ButtonHTMLAttributes<HTMLButtonElement>;


const Button = memo(({ children, ...props }: CommonButtonProps) => {
  return (
    <button {...props} className="btn btn-primary">
      {children}
    </button>
  );
});

export default Button;
