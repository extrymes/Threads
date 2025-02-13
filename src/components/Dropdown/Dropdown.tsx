import { useEffect, useRef } from "react";

export default function Dropdown({
  children,
  isOpen,
  setIsOpen,
  className,
}: {
  children: React.ReactNode;
  isOpen: boolean;
  setIsOpen: (state: boolean) => void;
  className?: string;
}) {
  // References
  const dropdownRef = useRef<HTMLDivElement | null>(null);

  // Side effects
  useEffect(() => {
    // Handle click outside
    const handleMouseDown = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };
    // Handle escape key
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setIsOpen(false);
    };
    if (isOpen) {
      document.addEventListener("mousedown", handleMouseDown);
      document.addEventListener("keydown", handleKeyDown);
    } else {
      document.removeEventListener("mousedown", handleMouseDown);
      document.removeEventListener("keydown", handleKeyDown);
    }
    return () => {};
  }, [isOpen]);

  // Functions
  const handleDropdownClick = (e: React.MouseEvent) => {
    if ((e.target as HTMLElement).tagName.toLowerCase() === "li")
      setIsOpen(false);
  };

  // Render
  if (!isOpen) return null;
  return (
    <div
      className={`dropdown-menu ${className}`}
      ref={dropdownRef}
      onClick={(e) => handleDropdownClick(e)}
    >
      <ul>{children}</ul>
    </div>
  );
}
