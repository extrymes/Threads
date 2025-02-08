"use client";

import ConnectedLayout from "@/components/ConnectedLayout/ConnectedLayout";
import PostLayout from "@/components/PostLayout/PostLayout";
import { Post } from "@/types/Post";
import { User } from "@/types/User";
import Image from "next/image";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

export default function Profile() {
  // Variables
  const params = useParams();
  const username = params.username?.slice(3);
  const router = useRouter();

  // State management
  const [user, setUser] = useState<User | null>(null);
  const [posts, setPosts] = useState<Post[]>([]);

  // Side effects
  useEffect(() => {
    if (!username) {
      router.push("/");
      return;
    }
    fetchUserDataPosts();
  }, []);

  // Functions
  const fetchUserDataPosts = async () => {
    const response = await fetch("/api/user", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username }),
    });
    if (!response.ok) {
      toast.error("Error occured when trying to fetch user");
      router.push("/");
      return;
    }
    const data = await response.json();
    setUser(data.user);
    setPosts(data.posts);
  };

  // Render
  return (
    <ConnectedLayout>
      <div className="md:w-[800px] w-full mx-auto mt-10 text-white">
        {/* Infos */}
        <div className="flex justify-between gap-4">
          {/* Data */}
          <div>
            <h1 className="text-3xl font-semibold">{user?.name}</h1>
            <div className="text-threads-gray-light mt-2">
              @{user?.username || "unknown"}
            </div>
            <div className="mt-5 whitespace-pre-line">{user?.bio}</div>
            {user?.url && (
              <div className="mt-5 text-blue-500 hover:text-blue-400 duration-150">
                <a href={user?.url} target="_blank">
                  {user?.url}
                </a>
              </div>
            )}
          </div>

          {/* Avatar */}
          <div>
            <Image
              src={user?.profile || "/avatar.jpg"}
              alt="User"
              width={100}
              height={100}
              priority
              className="rounded-full object-cover"
            />
          </div>
        </div>

        {/* Tabs */}
        <div className="flex mt-10 mb-5 gap-4">
          {/* Threads */}
          <div className="flex-1 px-4 text-center border-b text-white border-white pb-4 hover:text-white hover:border-white duration-150 cursor-pointer">
            Threads
          </div>

          {/* Responses */}
          <div className="flex-1 px-4 text-center border-b text-threads-gray-light border-threads-gray-light pb-4 hover:text-white hover:border-white duration-150 cursor-pointer">
            Responses
          </div>

          {/* Reposts */}
          <div className="flex-1 px-4 text-center border-b text-threads-gray-light border-threads-gray-light pb-4 hover:text-white hover:border-white duration-150 cursor-pointer">
            Reposts
          </div>
        </div>

        {/* Posts */}
        <div className="flex flex-col gap-4">
          {posts.map((post: Post) => (
            <div key={post._id}>
              <PostLayout post={post} />
            </div>
          ))}
        </div>
      </div>
    </ConnectedLayout>
  );
}
