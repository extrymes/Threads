import { useEffect } from "react";
import { createPortal } from "react-dom";

export default function Modal({
  children,
  openModal,
  setOpenModal,
}: {
  children: React.ReactNode;
  openModal: boolean;
  setOpenModal: (state: boolean) => void;
}) {
  // Side effects
  useEffect(() => {
    // Handle escape key
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpenModal(false);
    };
    if (openModal) {
      document.body.style.overflow = "hidden";
      document.addEventListener("keydown", handleKeyDown);
    } else {
      document.body.style.overflow = "unset";
      document.removeEventListener("keydown", handleKeyDown);
    }
  }, [openModal]);

  // Functions
  const handleClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) setOpenModal(false);
  };

  // Render
  return openModal
    ? createPortal(
        <div className="modal-background" onClick={(e) => handleClick(e)}>
          <div className="modal-user-foreground">{children}</div>
        </div>,
        document.body
      )
    : null;
}
