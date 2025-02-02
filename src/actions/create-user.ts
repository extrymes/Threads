"use server";

import bcrypt from "bcrypt";
import { MongoClient } from "mongodb";

export const createUser = async (
  name: FormDataEntryValue,
  username: FormDataEntryValue,
  email: FormDataEntryValue,
  password: FormDataEntryValue
) => {
  // Connect to the MongoDB cluster
  const client = await MongoClient.connect(
    process.env.MONGODB_CLIENT as string
  );
  const db = client.db(process.env.MONGODB_DATABASE);
  try {
    let user;
    // Check if username is already used
    user = await db.collection("users").find({ username }).limit(1).toArray();
    if (user.length != 0) {
      await client.close();
      throw new Error("Username already used");
    }

    // Check if email is already used
    user = await db.collection("users").find({ email }).limit(1).toArray();
    if (user.length != 0) {
      await client.close();
      throw new Error("Email already used");
    }

    // Encrypt the password
    const encryptedPassword = await bcrypt.hash(password.toString(), 10);

    // Create user
    await db.collection("users").insertOne({
      name,
      username,
      email,
      password: encryptedPassword,
      profile: "/picture.png",
      bio: "-",
      url: "",
      creation: new Date(),
    });
  } catch (e: unknown) {
    await client.close();
    if (e instanceof Error) throw new Error(e.message);
  }
};
