"use client";

import ConnectedLayout from "@/components/ConnectedLayout/ConnectedLayout";
import UserCard from "@/components/UserCard/UserCard";
import { User } from "@/types/User";
import { isSimpleKey } from "@/utils/is-simple-key";
import { useEffect, useRef, useState } from "react";
import { toast } from "react-toastify";

export default function Search() {
  // State management
  const [users, setUsers] = useState<User[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  // References
  const searchInputRef = useRef<HTMLInputElement>(null);
  const searchTimeoutRef = useRef<NodeJS.Timeout>(null);

  // Side effects
  useEffect(() => {
    // Focus input when typing
    const handleKeyDown = (e: KeyboardEvent) => {
      if (isSimpleKey(e) && document.activeElement !== searchInputRef.current)
        searchInputRef.current?.focus();
    };

    // Add event listeners on mounting
    document.addEventListener("keydown", handleKeyDown);

    // Remove event listeners on demounting
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, []);

  // Functions
  const searchUsers = async (query: string) => {
    if (searchTimeoutRef.current) clearTimeout(searchTimeoutRef.current);
    if (query === "") return setUsers([]);
    searchTimeoutRef.current = setTimeout(async () => {
      setIsLoading(true);
      try {
        const res = await fetch("/api/user/search", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ query }),
        });
        const data = await res.json();
        if (!res.ok) {
          if (res.status === 404) return setUsers([]);
          return toast.error("Error occurred when trying to search users");
        }
        setUsers(data.users);
      } finally {
        setIsLoading(false);
      }
    }, 300);
  };

  // Render
  return (
    <ConnectedLayout>
      <div className="mt-10 md:w-[800px] mx-auto w-full">
        {/* Search */}
        <form>
          <input
            ref={searchInputRef}
            type="search"
            placeholder="Search"
            className="input"
            onChange={(e) => searchUsers(e.target.value)}
          />
        </form>
        {/* Result */}
        <div className="flex flex-col gap-5 mt-10">
          {!searchInputRef.current?.value ? (
            <div className="text-threads-gray-light text-center">
              Search for profiles to discover
            </div>
          ) : isLoading ? (
            <div className="text-threads-gray-light text-center">
              <div className="loading loading-spinner loading-md">
                Loading...
              </div>
            </div>
          ) : users.length > 0 ? (
            users.map((user) => (
              <div key={user._id}>
                <UserCard user={user} />
              </div>
            ))
          ) : (
            <div className="text-threads-gray-light text-center">
              No user found :/
            </div>
          )}
        </div>
      </div>
    </ConnectedLayout>
  );
}
