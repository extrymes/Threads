"use server";

import { MongoClient } from "mongodb";
import { revalidatePath } from "next/cache";

export const createPost = async (
  content: string,
  username: string,
  profile: string
) => {
  let client;
  // Try to create a new post in database
  try {
    client = await MongoClient.connect(process.env.MONGODB_CLIENT as string);
    const db = client.db(process.env.MONGODB_DATABASE);
    await db.collection("posts").insertOne({
      content,
      username,
      profile,
      creation: new Date(),
    });
    await client.close();
    revalidatePath("/");
  } catch (e: any) {
    if (client) await client.close();
    throw new Error(e.message);
  }
};
