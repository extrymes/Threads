"use client";

import Button from "@/components/Button/Button";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function Pass() {
  // Variables
  const router = useRouter();

  // Functions
  const onContinue = () => {
    document.cookie = "guest=true";
    router.push("/");
  };

  // Render
  return (
    <div className="w-[440px] mx-auto pt-[19vw]">
      {/* Title */}
      <h1 className="title flex items-center gap-1">
        <Link href="/login">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="1em"
            height="1em"
            viewBox="0 0 256 256"
          >
            <path
              fill="currentColor"
              d="M224 128a8 8 0 0 1-8 8H59.31l58.35 58.34a8 8 0 0 1-11.32 11.32l-72-72a8 8 0 0 1 0-11.32l72-72a8 8 0 0 1 11.32 11.32L59.31 120H216a8 8 0 0 1 8 8"
            ></path>
          </svg>
        </Link>
        Continue as guest
      </h1>

      {/* Text */}
      <p className="text-threads-gray-light mt-4">
        You can navigate on Threads without profile, but you cannot post and
        interact with content.
      </p>
      {/* Button */}
      <Button onClick={onContinue}>Continue</Button>
    </div>
  );
}
