"use client";

import Button from "@/components/Button/Button";
import ConnectedLayout from "@/components/ConnectedLayout/ConnectedLayout";
import Modal from "@/components/Modal/Modal";
import PostLayout from "@/components/PostLayout/PostLayout";
import { Post } from "@/types/Post";
import { User } from "@/types/User";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

export default function Profile() {
  // Variables
  const { data: session } = useSession();
  const params = useParams();
  const username = params.username?.slice(3);
  const router = useRouter();

  // State management
  const [user, setUser] = useState<User | null>(null);
  const [posts, setPosts] = useState<Post[]>([]);
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [profileInput, setProfileInput] = useState("");
  const [bioInput, setBioInput] = useState("");
  const [linkInput, setLinkInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);

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
    const data = await response.json();
    if (!response.ok) {
      toast.error("Error occurred when trying to fetch user");
      router.push("/");
      return;
    }
    setUser(data.user);
    setPosts(data.posts);
  };
  if (!user || !posts) return;
  const openProfileEditionModal = () => {
    setProfileInput(user.profile);
    setBioInput(user.bio);
    setLinkInput(user.url);
    setIsOpenModal(true);
  };
  const checkForChanges = (): boolean => {
    return (
      user.profile !== profileInput ||
      user.bio !== bioInput ||
      user.url !== linkInput
    );
  };
  const saveChanges = async () => {
    if (isLoading || !checkForChanges()) return;
    setIsLoading(true);
    let finalBio = bioInput;
    if (!finalBio) finalBio = "-";
    const response = await fetch("/api/user/edit", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username,
        profile: profileInput,
        bio: finalBio,
        url: linkInput,
      }),
    });
    const data = await response.json();
    if (!response.ok) {
      setIsLoading(false);
      toast.error("Error when trying to save changes!");
      return;
    }
    const newUser = {
      ...user,
      profile: profileInput,
      bio: finalBio,
      url: linkInput,
    };
    setUser(newUser);
    setIsOpenModal(false);
    setIsLoading(false);
    toast.success("Profile updated!");
  };

  // Render
  return (
    <ConnectedLayout>
      {/* Profile edition modal */}
      <Modal
        title="Profile edition"
        isOpen={isOpenModal}
        setIsOpen={setIsOpenModal}
      >
        {/* Profile avatar */}
        <div className="flex gap-3">
          <div className="flex-1">
            <label className="label" htmlFor="picture">
              Profile avatar
            </label>
            <input
              type="url"
              name="picture"
              id="picture"
              className="input"
              placeholder="https://imgur.com/image.png"
              value={profileInput}
              onChange={(e) => setProfileInput(e.target.value)}
            ></input>
          </div>
          <div>
            <Image
              src={profileInput || "./avatar.jpg"}
              alt="Profile"
              width={100}
              height={100}
              className="rounded-full object-cover aspect-square"
              unoptimized
            ></Image>
          </div>
        </div>

        {/* Bio */}
        <div className="mt-5">
          <label className="label" htmlFor="bio">
            Bio
          </label>
          <textarea
            className="input"
            id="bio"
            name="bio"
            placeholder="My name is Simon..."
            value={bioInput}
            onChange={(e) => setBioInput(e.target.value)}
          ></textarea>
        </div>

        {/* URL */}
        <div className="mt-5">
          <label className="label" htmlFor="url">
            Link
          </label>
          <input
            className="input"
            type="url"
            id="url"
            name="url"
            placeholder="https://42.fr"
            value={linkInput}
            onChange={(e) => setLinkInput(e.target.value)}
          ></input>
        </div>

        {/* Edit button */}
        <div className="flex justify-end mt-1">
          <div>
            <Button
              onClick={saveChanges}
              disabled={isLoading || !checkForChanges()}
            >
              Save changes
            </Button>
          </div>
        </div>
      </Modal>
      <div className="md:w-[800px] w-full mx-auto mt-10">
        {/* Infos */}
        <div className="flex justify-between gap-4">
          {/* Data */}
          <div className="min-w-0 max-w-lg">
            <h1 className="text-3xl font-semibold">{user.name}</h1>
            <div className="text-threads-gray-light mt-2">
              @{user.username || "unknown"}
            </div>
            <div className="mt-5 whitespace-pre-line break-words">
              {user.bio}
            </div>
            {user.url && (
              <div className="mt-5 text-blue-500 hover:text-blue-400 duration-150">
                <a href={user.url} target="_blank">{user.url}</a>
              </div>
            )}
          </div>

          {/* Profile avatar */}
          <div className="shrink-0">
            <Image
              src={user.profile || "/avatar.jpg"}
              alt="Profile"
              width={100}
              height={100}
              className="rounded-full object-cover aspect-square"
              priority
              unoptimized
            />
          </div>
        </div>

        {/* Profile edition */}
        {session?.user.username === username && (
          <div className="user-button" onClick={openProfileEditionModal}>
            Edit profile
          </div>
        )}

        {/* Tabs */}
        <div className="flex mt-10 mb-5 gap-4">
          {/* Threads */}
          <div className="flex-1 px-4 text-center border-b border-black dark:border-white pb-4 hover:text-black dark:hover:text-white hover:border-black dark:hover:border-white duration-150 cursor-pointer">
            Threads
          </div>

          {/* Responses */}
          <div className="flex-1 px-4 text-center border-b text-threads-gray-light dark:border-threads-gray-light pb-4 hover:text-black dark:hover:text-white hover:border-black dark:hover:border-white duration-150 cursor-pointer">
            Responses
          </div>

          {/* Reposts */}
          <div className="flex-1 px-4 text-center border-b text-threads-gray-light dark:border-threads-gray-light pb-4 hover:text-black dark:hover:text-white hover:border-black dark:hover:border-white duration-150 cursor-pointer">
            Reposts
          </div>
        </div>

        {/* Posts */}
        <div className="flex flex-col gap-4">
          {posts.length > 0 ? (
            posts.map((post: Post) => (
              <div key={post._id}>
                <PostLayout post={post} />
              </div>
            ))
          ) : (
            <div className="text-threads-gray-light text-center mt-4">
              No post here yet...
            </div>
          )}
        </div>
      </div>
    </ConnectedLayout>
  );
}
