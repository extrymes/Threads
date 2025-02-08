import { MongoClient } from "mongodb";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const data = await req.json();
  const { username, profile, bio, url } = data;
  let client;
  // Try to update user data in database
  try {
    client = await MongoClient.connect(process.env.MONGODB_CLIENT as string);
    const db = client.db(process.env.MONGODB_DATABASE);
    const user = await db.collection("users").findOne({ username });
    if (!user)
      return NextResponse.json(
        { error: "This user does not exist!" },
        { status: 404 }
      );
    await db.collection("users").updateOne(
      { username },
      {
        $set: {
          profile,
          bio,
          url,
        },
      }
    );
    return NextResponse.json({ user }, { status: 200 });
  } catch (e: any) {
    return NextResponse.json({ error: e.message }, { status: 500 });
  } finally {
    if (client) await client.close();
  }
}
