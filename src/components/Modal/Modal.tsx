import { useEffect, useRef, useState } from "react";
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

  // References
  const modalRef = useRef<HTMLDivElement | null>(null);

  // Side effects
  useEffect(() => {
    // Handle click outside
    const handleMouseDown = (event: MouseEvent) => {
      if (
        modalRef.current &&
        !modalRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };
    // Handle escape key
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setIsOpen(false);
    };
    if (isOpen) {
      setIsVisible(true);
      document.body.style.overflow = "hidden";
      document.addEventListener("mousedown", handleMouseDown);
      document.addEventListener("keydown", handleKeyDown);
    } else {
      setIsClosing(true);
      setTimeout(() => {
        setIsClosing(false);
        setIsVisible(false);
        document.body.style.overflow = "unset";
        document.removeEventListener("mousedown", handleMouseDown);
        document.removeEventListener("keydown", handleKeyDown);
      }, 390);
    }
  }, [isOpen]);

  // Render
  if (!isVisible) return null;
  return createPortal(
    <div className={`modal-background ${isClosing ? "fade-out" : "fade-in"}`}>
      <div
        className={`modal-foreground ${isClosing ? "slide-out" : "slide-in"}`}
        ref={modalRef}
      >
        <header className="flex justify-between items-center text-xl">
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
        <div className="border-t dark:border-threads-gray-light my-5"></div>
        <div>{children}</div>
      </div>
    </div>,
    document.body
  );
}
