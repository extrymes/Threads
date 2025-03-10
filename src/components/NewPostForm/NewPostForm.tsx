"use client";

import { createPost } from "@/actions/create-post";
import { useSession } from "next-auth/react";
import { useRef, useState } from "react";
import { toast } from "react-toastify";
import Button from "../Button/Button";
import UserAvatar from "../UserAvatar/UserAvatar";

export default function NewPostForm({
  closeModal,
}: {
  closeModal?: () => void;
}) {
  // Variables
  const { data: session } = useSession();
  const maxLength = 200;

  // State management
  const [content, setContent] = useState("");

  // References
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // Functions
  const prepareCreatePost = async () => {
    // Check if user is connected
    if (!session?.user) {
      toast.error("Make sure you're logged in!");
      return;
    }
    // Check content length
    if (content.length == 0 || content.length > maxLength) {
      toast.error("Invalid content length!");
      return;
    }
    // Try to create post in database
    try {
      await createPost(content, session.user.username, session.user.profile);
    } catch (e: any) {
      toast.error(e.message);
      return;
    }
    toast.success("Post created!");
    setContent("");
    if (closeModal) closeModal();
  };

  // Render
  return (
    <form action={prepareCreatePost}>
      {/* Content */}
      <div className="flex gap-3 w-full">
        {/* Profile avatar */}
        <div>
          <UserAvatar
            src={session?.user.profile}
            width={50}
            height={50}
            className="mt-5"
          />
        </div>

        {/* Input */}
        <div className="flex-1">
          <textarea
            className="input"
            placeholder="Start a thread..."
            name="content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            maxLength={maxLength}
            rows={3}
            ref={textareaRef}
          />
        </div>
      </div>

      <div className="flex justify-between items-center w-full">
        {/* Character counter */}
        <div className="text-threads-gray-light ml-16">
          {content.length} / {maxLength}
        </div>

        {/* Post button */}
        <div>
          <Button
            formButton
            disabled={content.length == 0 || content.length > maxLength}
          >
            Post
          </Button>
        </div>
      </div>
    </form>
  );
}
