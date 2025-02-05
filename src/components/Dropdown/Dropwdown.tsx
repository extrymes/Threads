import { useEffect, useRef } from "react";

export default function Dropwdown({
  children,
  isOpen,
  setIsOpen,
}: {
  children: React.ReactNode;
  isOpen: boolean;
  setIsOpen: (state: boolean) => void;
}) {
  // Variables
  const dropdownRef = useRef<HTMLDivElement | null>(null);

  // Functions
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

    // Add event listeners on mounting
    document.addEventListener("mousedown", handleMouseDown);
    document.addEventListener("keydown", handleKeyDown);

    // Remove event listeners on demounting
    return () => {
      document.removeEventListener("mousedown", handleMouseDown);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  return isOpen ? (
    <div className="dropdown-menu" ref={dropdownRef}>
      <ul>{children}</ul>
    </div>
  ) : null;
}
