"use client";

import { signOut, useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";
import Button from "../Button/Button";
import Dropwdown from "../Dropdown/Dropwdown";
import Footer from "../Footer/Footer";

export default function ConnectedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Variables
  const pathname = usePathname();
  const router = useRouter();
  const { data: session } = useSession();
  const [dropdownIsOpen, dropdownSetIsOpen] = useState(false);

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

        {/* Profile */}
        <div className="z-10 relative inline-block text-left">
          {session?.user ? (
            // User avatar
            <Image
              onClick={() => dropdownSetIsOpen(!dropdownIsOpen)}
              src={session.user.profile}
              alt="Profile"
              width={60}
              height={60}
              className="cursor-pointer rounded-full border-4 border-transparent hover:border-threads-gray-light duration-150"
            ></Image>
          ) : (
            // Login button
            <Link href="/login">
              <Button withoutMarginTop>Login</Button>
            </Link>
          )}

          {/* Dropdown menu */}
          <Dropwdown isOpen={dropdownIsOpen} setIsOpen={dropdownSetIsOpen}>
            {/* My profile option */}
            <Link href={`/@${session?.user.username}`}>
              <li>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="mr-1"
                  width={22}
                  height={22}
                  viewBox="0 0 24 24"
                >
                  <path
                    fill="currentColor"
                    d="M12 12q-1.65 0-2.825-1.175T8 8t1.175-2.825T12 4t2.825 1.175T16 8t-1.175 2.825T12 12m-8 8v-2.8q0-.85.438-1.562T5.6 14.55q1.55-.775 3.15-1.162T12 13t3.25.388t3.15 1.162q.725.375 1.163 1.088T20 17.2V20z"
                  ></path>
                </svg>
                My profile
              </li>
            </Link>

            {/* Logout option */}
            <li onClick={() => signOut()}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="mr-1 text-red-500"
                width={22}
                height={22}
                viewBox="0 0 24 24"
              >
                <path
                  fill="currentColor"
                  fillRule="evenodd"
                  d="m8.379 2.669l3.69-.58c3.22-.506 4.83-.76 5.88.139C19 3.126 19 4.756 19 8.016V11h-5.92l2.7-3.376l-1.56-1.25l-4 5l-.5.626l.5.624l4 5l1.56-1.25L13.08 13H19v2.983c0 3.26 0 4.89-1.05 5.788s-2.66.645-5.881.14l-3.69-.58c-1.613-.254-2.419-.38-2.899-.942S5 19.012 5 17.38V6.62c0-1.632 0-2.449.48-3.01s1.286-.688 2.899-.941"
                  clipRule="evenodd"
                ></path>
              </svg>
              Logout
            </li>
          </Dropwdown>
        </div>
      </header>

      {/* Content */}
      <div className="flex-1">{children}</div>

      {/* Footer */}
      <Footer />
    </section>
  );
}
