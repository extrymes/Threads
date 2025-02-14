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
      edited: false,
      creation: new Date(),
    });
    revalidatePath("/");
  } catch (e: any) {
    throw new Error(e.message);
  } finally {
    if (client) await client.close();
  }
};
