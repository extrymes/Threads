import { MongoClient } from "mongodb";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  // Get username from request body
  const data = await req.json();
  const { username } = data;
  let client;
  try {
    // Connect to the MongoDB cluster
    client = await MongoClient.connect(process.env.MONGODB_CLIENT as string);
    // Connect to the MongoDB database
    const db = client.db(process.env.MONGODB_DATABASE);
    // Get the user in database
    let user = await db.collection("users").findOne({ username });
    if (!user) throw new Error("This user does not exist");
    // Format user
    const formattedUser = { ...user, _id: user._id.toString() };
    // Fetch posts for this user
    let posts = await db
      .collection("posts")
      .find({ username })
      .sort({ creation: -1 })
      .toArray();
    // Format posts
    posts = posts.map((post: any) => ({
      ...post,
      _id: post._id.toString(),
    }));
    // Close MongoDB connection
    await client.close();
    // Return next response
    return NextResponse.json(
      {
        user,
        posts,
      },
      { status: 200 }
    );
  } catch (e: any) {
    await client?.close();
    throw new Error(e.message);
  }
}
