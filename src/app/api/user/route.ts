import { MongoClient } from "mongodb";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const data = await req.json();
  const { username } = data;
  let client;
  // Try to fetch user and posts data in database
  try {
    client = await MongoClient.connect(process.env.MONGODB_CLIENT as string);
    const db = client.db(process.env.MONGODB_DATABASE);
    const user = await db.collection("users").findOne({ username });
    if (!user)
      return NextResponse.json(
        { error: "This user does not exist!" },
        { status: 404 }
      );
    const formattedUser = { ...user, _id: user._id.toString() };
    const posts = await db
      .collection("posts")
      .find({ username })
      .sort({ creation: -1 })
      .toArray();
    const formattedPosts = posts.map((post) => ({
      ...post,
      _id: post._id.toString(),
    }));
    return NextResponse.json(
      {
        user: formattedUser,
        posts: formattedPosts,
      },
      { status: 200 }
    );
  } catch (e: any) {
    return NextResponse.json({ error: e.message }, { status: 500 });
  } finally {
    if (client) await client.close();
  }
}
