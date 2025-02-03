"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Button from "../Button/Button";
import Footer from "../Footer/Footer";

export default function ConnectedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  return (
    <section className="flex flex-col min-h-screen px-5">
      {/* Header */}
      <header className="flex justify-between items-center py-4">
        {/* Nav */}
        <nav className="absolute left-0 top-0 right-0 flex justify-center py-7 gap-5 z-0">
          {/* Home */}
          <Link href="/">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className={`w-10 h-10 hover:w-11 hover:h-11 hover:bg-threads-gray-dark duration-150 p-1 rounded-xl ${
                pathname == "/" ? `text-white` : `text-threads-gray-light`
              }`}
              width="1em"
              height="1em"
              viewBox="0 0 24 24"
            >
              <path
                fill="currentColor"
                d="M4 19v-9q0-.475.213-.9t.587-.7l6-4.5q.525-.4 1.2-.4t1.2.4l6 4.5q.375.275.588.7T20 10v9q0 .825-.588 1.413T18 21h-3q-.425 0-.712-.288T14 20v-5q0-.425-.288-.712T13 14h-2q-.425 0-.712.288T10 15v5q0 .425-.288.713T9 21H6q-.825 0-1.412-.587T4 19"
              ></path>
            </svg>
          </Link>

          {/* Search */}
          <Link href="/search">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className={`w-10 h-10 hover:w-11 hover:h-11 hover:bg-threads-gray-dark duration-150 p-1 rounded-xl ${
                pathname == "/search" ? `text-white` : `text-threads-gray-light`
              }`}
              width="1em"
              height="1em"
              viewBox="0 0 256 256"
            >
              <path
                fill="currentColor"
                d="M232.49 215.51L185 168a92.12 92.12 0 1 0-17 17l47.53 47.54a12 12 0 0 0 17-17ZM44 112a68 68 0 1 1 68 68a68.07 68.07 0 0 1-68-68"
              ></path>
            </svg>
          </Link>
        </nav>

        {/* Logo */}
        <Image src="/logo.png" alt="Threads" priority width={40} height={40} />

        {/* Button */}
        <div className="z-10">
          <Link href="/login">
            <Button withoutMarginTop>Log in</Button>
          </Link>
        </div>
      </header>

      {/* Content */}
      <div className="flex-1">{children}</div>

      {/* Footer */}
      <Footer />
    </section>
  );
}
