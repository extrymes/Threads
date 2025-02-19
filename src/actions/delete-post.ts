"use server";

import { authOptions } from "@/app/api/auth/[...nextauth]/auth";
import { MongoClient, ObjectId } from "mongodb";
import { getServerSession } from "next-auth";
import { revalidatePath } from "next/cache";

export const deletePost = async (postId: string) => {
  const session = await getServerSession(authOptions);
  let client;
  // Try to delete a post from database
  try {
    client = await MongoClient.connect(process.env.MONGODB_CLIENT as string);
    const db = client.db(process.env.MONGODB_DATABASE);
    const post = await db
      .collection("posts")
      .findOne({ _id: new ObjectId(postId) });
    if (!post) throw new Error("This post no longer exists!");
    if (post.username != session?.user.username)
      throw new Error("You are not the author of this post!");
    await db.collection("posts").deleteOne({ _id: post._id });
    revalidatePath("/");
    revalidatePath(`/@${post.username}`, "page");
  } catch (e: any) {
    throw new Error(e.message);
  } finally {
    if (client) await client.close();
  }
};
