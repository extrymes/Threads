import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import "./Modal.css";

export default function Modal({
  children,
  title,
  isOpen,
  setIsOpen,
}: {
  children: React.ReactNode;
  title: string;
  isOpen: boolean;
  setIsOpen: (state: boolean) => void;
}) {
  // State management
  const [isVisible, setIsVisible] = useState(isOpen);
  const [isClosing, setIsClosing] = useState(false);

  // Side effects
  useEffect(() => {
    // Handle escape key
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setIsOpen(false);
    };
    if (isOpen) {
      setIsVisible(true);
      document.body.style.overflow = "hidden";
      document.addEventListener("keydown", handleKeyDown);
    } else {
      setIsClosing(true);
      setTimeout(() => {
        setIsClosing(false);
        setIsVisible(false);
        document.body.style.overflow = "unset";
        document.removeEventListener("keydown", handleKeyDown);
      }, 390);
    }
  }, [isOpen]);

  // Functions
  const handleClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) setIsOpen(false);
  };

  // Render
  if (!isVisible) return null;
  return createPortal(
    <div
      className={`modal-background ${isClosing ? "fade-out" : "fade-in"}`}
      onClick={(e) => handleClick(e)}
    >
      <div
        className={`modal-foreground ${isClosing ? "slide-out" : "slide-in"}`}
      >
        <header className="flex justify-between items-center text-xl text-white">
          <div>{title}</div>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="cursor-pointer"
            width="1.3em"
            height="1.3em"
            viewBox="0 0 24 24"
            onClick={() => setIsOpen(false)}
          >
            <path
              fill="currentColor"
              d="M6.4 19L5 17.6l5.6-5.6L5 6.4L6.4 5l5.6 5.6L17.6 5L19 6.4L13.4 12l5.6 5.6l-1.4 1.4l-5.6-5.6z"
            ></path>
          </svg>
        </header>
        <div className="border-t border-threads-gray-light my-5"></div>
        <div>{children}</div>
      </div>
    </div>,
    document.body
  );
}
