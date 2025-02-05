"use client";

import { useFormStatus } from "react-dom";

export default function Button({
  children,
  onClick,
  withoutMarginTop,
  formButton,
  disabled,
}: {
  children: React.ReactNode;
  onClick?: () => void;
  withoutMarginTop?: boolean;
  formButton?: boolean;
  disabled?: boolean;
}) {
  // Variables
  const { pending } = useFormStatus();

  return (
    <div>
      <button
        disabled={disabled || (formButton && pending)}
        className={`bg-white rounded-3xl border-threads-gray-light w-full p-4 ${
          withoutMarginTop ? "" : `mt-4`
        } hover:bg-gray-300 disabled:bg-opacity-50 disabled:cursor-not-allowed duration-150`}
        onClick={onClick}
      >
        {children}
      </button>
    </div>
  );
}
