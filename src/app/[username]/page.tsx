"use client";

import ConnectedLayout from "@/components/ConnectedLayout/ConnectedLayout";
import Post from "@/components/Post/Post";
import Image from "next/image";
import { useParams } from "next/navigation";

export default function Profile() {
  // Variables
  const params = useParams();
  const username = params.username?.slice(3);
  const posts = [
    {
      _id: "1",
      content: "Welcome to Threads!",
      username: "John Doe",
      profile: "/picture.png",
    },
    {
      _id: "2",
      content: "Hello World!",
      username: "Maxime Rochedy",
      profile: "/picture.png",
    },
  ];

  return (
    <ConnectedLayout>
      <div className="md:w-[800px] w-full mx-auto mt-10 text-white">
        {/* Infos */}
        <div className="flex justify-between gap-4">
          {/* Data */}
          <div>
            <h1 className="text-3xl font-semibold">{username}</h1>
            <div className="text-threads-gray-light mt-2">@{username}</div>
            <div className="mt-5 whitespace-pre-line">-</div>
            <div className="mt-5 text-blue-500 hover:text-blue-400 duration-150">
              <a href="https://42.fr" target="_blank">
                42.fr
              </a>
            </div>
          </div>

          {/* Avatar */}
          <div>
            <Image
              src="/picture.png"
              alt="User"
              width={100}
              height={100}
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
          {posts.map((post) => (
            <div key={post._id}>
              <Post post={post} />
            </div>
          ))}
        </div>
      </div>
    </ConnectedLayout>
  );
}
