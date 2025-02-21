"use client";

import { deletePost } from "@/actions/delete-post";
import { editPost } from "@/actions/edit-post";
import { Post } from "@/types/Post";
import moment from "moment-timezone";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { toast } from "react-toastify";
import Dropdown from "../Dropdown/Dropdown";
import UserAvatar from "../UserAvatar/UserAvatar";

export default function PostLayout({ post }: { post: Post }) {
  // Variables
  const { data: session } = useSession();
  const maxLength = 200;

  // State management
  const [isOpenDropdown, setIsOpenDropdown] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editInput, setEditInput] = useState("");

  // References
  const editInputRef = useRef<HTMLInputElement | null>(null);

  // Functions
  const prepareEditPost = async () => {
    setIsEditing(false);
    if (post.content === editInput || editInput.length === 0) return;
    if (editInput.length > maxLength) {
      toast.error("Invalid content length!");
      return;
    }
    try {
      await editPost(post._id, editInput);
    } catch (e: any) {
      toast.error(e.message);
      return;
    }
    toast.success("Post edited!");
  };
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

  // Side effects
  useEffect(() => {
    // Handle editing keys
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setIsEditing(false);
      else if (e.key === "Enter") prepareEditPost();
    };
    if (isEditing) {
      editInputRef.current?.focus();
      document.addEventListener("keydown", handleKeyDown);
    }
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [isEditing, prepareEditPost]);

  // Render
  return (
    <div className="post">
      {/* User avatar */}
      <div className="shrink-0">
        <UserAvatar src={post.profile} width={50} height={50} priority />
      </div>

      {/* Post */}
      <div className="w-full min-w-0">
        <div className="flex justify-between text-center">
          {/* Username */}
          <Link href={`/@${post.username}`}>
            <b>{post.username}</b>
          </Link>

          <div className="flex items-center gap-2 text-sm text-threads-gray-light relative">
            {/* Creation date and edited state */}
            <div className="flex gap-1">
              <p>
                {moment
                  .utc(post.creation, "YYYY-MM-DD HH:mm:ss")
                  .tz("Europe/Paris")
                  .fromNow()}
              </p>
              <p>{post.edited && "(edited)"}</p>
            </div>

            {/* Options */}
            {session?.user && !isEditing && (
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
                    <li
                      onClick={() => {
                        setEditInput(post.content);
                        setIsEditing(true);
                      }}
                    >
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

        {/* Post content or editing mode */}
        {isEditing ? (
          <div>
            <input
              className="input"
              value={editInput}
              onChange={(e) => setEditInput(e.target.value)}
              ref={editInputRef}
              maxLength={maxLength}
            />
            <div className="flex mt-2 text-sm justify-between">
              <div className="flex">
                <div className="flex gap-1">
                  <p>escape to</p>
                  <b
                    className="cursor-pointer"
                    onClick={() => setIsEditing(false)}
                  >
                    cancel
                  </b>
                </div>
                <div className="mx-2">•</div>
                <div className="flex gap-1">
                  <p>entor to</p>
                  <b
                    className="cursor-pointer"
                    onClick={() => prepareEditPost()}
                  >
                    save
                  </b>
                </div>
              </div>
              <div className="text-threads-gray-light">
                {editInput.length} / {maxLength}
              </div>
            </div>
          </div>
        ) : (
          <div className="mt-3 whitespace-pre-line break-words">
            {post.content}
          </div>
        )}
      </div>
    </div>
  );
}
