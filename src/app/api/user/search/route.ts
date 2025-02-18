import { MongoClient } from "mongodb";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const data = await req.json();
  const { query } = data;
  let client;
  try {
    client = await MongoClient.connect(process.env.MONGODB_CLIENT as string);
    const db = client.db(process.env.MONGODB_DATABASE);
    let users = await db
      .collection("users")
      .find({
        $or: [
          { username: { $regex: query, $options: "i" } },
          { name: { $regex: query, $options: "i" } },
        ],
      })
      .limit(10)
      .toArray();
    if (users.length === 0)
      return NextResponse.json({ error: "No matches found" }, { status: 404 });
    users = users.map((user: any) => ({
      ...user,
      _id: user._id.toString(),
    }));
    return NextResponse.json({ users: users }, { status: 200 });
  } catch (e: any) {
    return NextResponse.json({ error: e.message }, { status: 500 });
  } finally {
    if (client) await client.close();
  }
}
