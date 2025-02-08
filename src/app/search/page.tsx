"use client";

import ConnectedLayout from "@/components/ConnectedLayout/ConnectedLayout";
import { useEffect, useRef } from "react";

export default function Search() {
  // Variables
  const inputRef = useRef<HTMLInputElement>(null);

  // Side effects
  useEffect(() => {
    // Focus input when typing
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key.length == 1 && document.activeElement != inputRef.current)
        inputRef.current?.focus();
    };

    // Add event listeners on mounting
    document.addEventListener("keydown", handleKeyDown);

    // Remove event listeners on demounting
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, []);

  // Render
  return (
    <ConnectedLayout>
      <div className="mt-10 md:w-[800px] mx-auto w-full">
        {/* Search */}
        <form>
          <input
            ref={inputRef}
            type="search"
            placeholder="Search"
            className="input"
          />

          {/* Result */}
          <div className="mt-32 text-threads-gray-light text-center">
            Search for profiles to discover
          </div>
        </form>
      </div>
    </ConnectedLayout>
  );
}
