import { useEffect, useRef } from "react";

export default function Dropwdown({
  children,
  openDropdown,
  setOpenDropdown,
  className,
}: {
  children: React.ReactNode;
  openDropdown: boolean;
  setOpenDropdown: (state: boolean) => void;
  className?: string;
}) {
  // Variables
  const dropdownRef = useRef<HTMLDivElement | null>(null);

  // Side effects
  useEffect(() => {
    // Handle click outside
    const handleMouseDown = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setOpenDropdown(false);
      }
    };
    // Handle escape key
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpenDropdown(false);
    };
    if (openDropdown) {
      document.addEventListener("mousedown", handleMouseDown);
      document.addEventListener("keydown", handleKeyDown);
    } else {
      document.removeEventListener("mousedown", handleMouseDown);
      document.removeEventListener("keydown", handleKeyDown);
    }
    return () => {};
  }, [openDropdown]);

  // Render
  return openDropdown ? (
    <div className={`dropdown-menu ${className}`} ref={dropdownRef}>
      <ul>{children}</ul>
    </div>
  ) : null;
}
