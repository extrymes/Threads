import ConnectedLayout from "@/components/ConnectedLayout/ConnectedLayout";
import NewPostForm from "@/components/NewPostForm/NewPostForm";
import Post from "@/components/Post/Post";
import { getServerSession } from "next-auth";
import { authOptions } from "./api/auth/[...nextauth]/route";

export default async function Index() {
  // Variables
  const session = await getServerSession(authOptions);
  const posts = [
    {
      _id: "1",
      content: "Welcome to Threads!",
      username: "John Doe",
      profile: "/avatar.jpg",
    },
    {
      _id: "2",
      content: "Hello World!",
      username: "Maxime Park",
      profile: "/avatar.jpg",
    },
  ];

  return (
    <ConnectedLayout>
      <div className="md:w-[800px] w-full mx-auto mt-10">
        {/* New post */}
        {session?.user && (
          <div className="border-b border-threads-gray-dark py-4">
            <NewPostForm />
          </div>
        )}

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
