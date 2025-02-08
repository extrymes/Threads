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
    let user = await db.collection("users").findOne({ username });
    if (!user) throw new Error("This user does not exist");
    const formattedUser = { ...user, _id: user._id.toString() };
    let posts = await db
      .collection("posts")
      .find({ username })
      .sort({ creation: -1 })
      .toArray();
    posts = posts.map((post: any) => ({
      ...post,
      _id: post._id.toString(),
    }));
    await client.close();
    return NextResponse.json(
      {
        user: formattedUser,
        posts,
      },
      { status: 200 }
    );
  } catch (e: any) {
    if (client) await client.close();
    throw new Error(e.message);
  }
}
