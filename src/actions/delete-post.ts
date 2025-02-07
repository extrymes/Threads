"use server";

import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { MongoClient, ObjectId } from "mongodb";
import { getServerSession } from "next-auth";
import { revalidatePath } from "next/cache";

export const deletePost = async (postId: string) => {
  // Get session data
  const session = await getServerSession(authOptions);
  let client;
  try {
    // Connect to the MongoDB cluster
    client = await MongoClient.connect(process.env.MONGODB_CLIENT as string);
    // Connect to the database
    const db = client.db(process.env.MONGODB_DATABASE);
    // Fetch the post in database
    const post = await db
      .collection("posts")
      .findOne({ _id: new ObjectId(postId) });
    if (!post) throw new Error("This post no longer exists!");
    if (post.username != session?.user.username)
      throw new Error("You are not the author of this post!");
    // Remove the post from database
    await db.collection("posts").deleteOne({ _id: post._id });
    // Close MongoDB connection
    await client.close();
    // Revalidate paths
    revalidatePath("/");
    revalidatePath(`/@${post.username}`, "page");
  } catch (e: any) {
    if (client) await client.close();
    throw new Error(e.message);
  }
};
