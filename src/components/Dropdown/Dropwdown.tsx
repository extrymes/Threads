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

    // Add event listeners on mounting
    document.addEventListener("mousedown", handleMouseDown);
    document.addEventListener("keydown", handleKeyDown);

    // Remove event listeners on demounting
    return () => {
      document.removeEventListener("mousedown", handleMouseDown);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  // Render
  return openDropdown ? (
    <div className={`dropdown-menu ${className}`} ref={dropdownRef}>
      <ul>{children}</ul>
    </div>
  ) : null;
}
