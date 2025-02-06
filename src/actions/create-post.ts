"use server";

import { MongoClient } from "mongodb";
import { revalidatePath } from "next/cache";

export const createPost = async (
  content: string,
  username: string,
  profile: string
) => {
  // Connect to the MongoDB cluster
  const client = await MongoClient.connect(
    process.env.MONGODB_CLIENT as string
  );
  // Connect to the database
  const db = client.db(process.env.MONGODB_DATABASE);
  // Create post in database
  await db.collection("posts").insertOne({
    content,
    username,
    profile,
    creation: new Date(),
  });
  // Close MongoDB connection
  await client.close();
  // Revalidate path
  revalidatePath("/");
};
