import ConnectedLayout from "@/components/ConnectedLayout/ConnectedLayout";
import Post from "@/components/Post/Post";

export default function Index() {
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
      username: "Maxime Park",
      profile: "/picture.png",
    },
  ];
  return (
    <ConnectedLayout>
      <div className="md:w-[800px] w-full mx-auto mt-10">
        {/* New post */}

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
