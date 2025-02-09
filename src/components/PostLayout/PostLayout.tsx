"use client";

import { deletePost } from "@/actions/delete-post";
import { Post } from "@/types/Post";
import moment from "moment-timezone";
import { useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { toast } from "react-toastify";
import Dropdown from "../Dropdown/Dropdown";

export default function PostLayout({ post }: { post: Post }) {
  // Variables
  const { data: session } = useSession();

  // State management
  const [isOpenDropdown, setIsOpenDropdown] = useState(false);

  // Functions
  const prepareDeletePost = async () => {
    if (!confirm("Are you sure you want to delete this post?")) return;
    // Try to remove the post from database
    try {
      await deletePost(post._id);
    } catch (e: any) {
      toast.error(e.message);
      return;
    }
    toast.success("Post deleted!");
  };

  // Render
  return (
    <div className="post">
      {/* User avatar */}
      <div>
        <Image
          src={post.profile}
          alt="User"
          width={50}
          height={50}
          className="rounded-full object-cover aspect-square"
          unoptimized
        />
      </div>

      {/* Post content */}
      <div className="text-white w-full">
        <div className="flex justify-between text-center">
          {/* Username */}
          <Link href={`/@${post.username}`}>
            <b>{post.username}</b>
          </Link>

          <div className="flex items-center gap-2 text-sm text-threads-gray-light relative">
            {/* Creation date */}
            <div>
              {moment
                .utc(post.creation, "YYYY-MM-DD HH:mm:ss")
                .tz("Europe/Paris")
                .fromNow()}
            </div>

            {/* Options */}
            {session?.user && (
              <div>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="1.2em"
                  height="1.2em"
                  className="cursor-pointer"
                  viewBox="0 0 24 24"
                  onClick={() => setIsOpenDropdown((state) => !state)}
                >
                  <path
                    fill="currentColor"
                    d="M7 12a2 2 0 1 1-4 0a2 2 0 0 1 4 0m7 0a2 2 0 1 1-4 0a2 2 0 0 1 4 0m7 0a2 2 0 1 1-4 0a2 2 0 0 1 4 0"
                  ></path>
                </svg>
              </div>
            )}

            {/* Dropdown menu */}
            {session?.user && (
              <Dropdown
                isOpen={isOpenDropdown}
                setIsOpen={setIsOpenDropdown}
                className="right-0 top-8"
              >
                {session.user.username != post.username ? (
                  <li className="danger">
                    Report
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                      <path
                        fill="currentColor"
                        d="M5 21V4h9l.4 2H20v10h-7l-.4-2H7v7z"
                      ></path>
                    </svg>
                  </li>
                ) : (
                  <>
                    <li>
                      Edit
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                      >
                        <path
                          fill="currentColor"
                          d="M3 17.46v3.04c0 .28.22.5.5.5h3.04c.13 0 .26-.05.35-.15L17.81 9.94l-3.75-3.75L3.15 17.1q-.15.15-.15.36M20.71 5.63l-2.34-2.34a.996.996 0 0 0-1.41 0l-1.83 1.83l3.75 3.75l1.83-1.83a.996.996 0 0 0 0-1.41"
                        ></path>
                      </svg>
                    </li>
                    <li className="danger" onClick={() => prepareDeletePost()}>
                      Delete
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                      >
                        <path
                          fill="currentColor"
                          d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6zM19 4h-3.5l-1-1h-5l-1 1H5v2h14z"
                        ></path>
                      </svg>
                    </li>
                  </>
                )}
              </Dropdown>
            )}
          </div>
        </div>

        {/* Text */}
        <div className="mt-3 whitespace-pre-line">{post.content}</div>
      </div>
    </div>
  );
}
