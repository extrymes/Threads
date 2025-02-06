import ConnectedLayout from "@/components/ConnectedLayout/ConnectedLayout";
import NewPostForm from "@/components/NewPostForm/NewPostForm";
import PostLayout from "@/components/PostLayout/PostLayout";
import { MongoClient } from "mongodb";
import { getServerSession } from "next-auth";
import { toast } from "react-toastify";
import { authOptions } from "./api/auth/[...nextauth]/route";

export default async function Index() {
  // Variables
  const session = await getServerSession(authOptions);

  // Try to find all posts
  let posts = [];
  try {
    // Connect to the MongoDB cluster
    const client = await MongoClient.connect(
      process.env.MONGODB_CLIENT as string
    );
    // Connect to the MongoDB database
    const db = client.db(process.env.MONGODB_DATABASE);
    // Find all posts
    posts = await db
      .collection("posts")
      .find()
      .sort({ creation: -1 })
      .toArray();
    // Format posts
    posts = posts.map((post: any) => ({
      ...post,
      _id: post._id.toString(),
    }));
    // Close MongoDB connection
    await client.close();
  } catch (e: any) {
    toast.error(e.message);
  }

  return (
    <ConnectedLayout>
      <div className="md:w-[800px] w-full mx-auto mt-10">
        {/* New post */}
        {session?.user && (
          <div className="border-b border-threads-gray-dark py-4 mb-2">
            <NewPostForm />
          </div>
        )}

        {/* Posts */}
        <div className="flex flex-col gap-4">
          {posts.length > 0 ? (
            posts.map((post) => (
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
