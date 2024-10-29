import React, { memo } from "react";

type CommonButtonProps = {
  children: React.ReactNode;
} & React.ButtonHTMLAttributes<HTMLButtonElement>;

const SecondaryButton = memo(({ children, ...props }: CommonButtonProps) => {
  return (
    <button {...props} className="btn btn-secondary">
      {children}
    </button>
  );
});

export default SecondaryButton;
