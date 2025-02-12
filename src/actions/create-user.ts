"use server";

import bcrypt from "bcrypt";
import { MongoClient } from "mongodb";

export const createUser = async (
  name: FormDataEntryValue,
  username: FormDataEntryValue,
  email: FormDataEntryValue,
  password: FormDataEntryValue
) => {
  let client;
  // Try to create a new user in database
  try {
    client = await MongoClient.connect(process.env.MONGODB_CLIENT as string);
    const db = client.db(process.env.MONGODB_DATABASE);
    let user;
    user = await db.collection("users").findOne({ username });
    if (user) throw new Error("This username is already used!");
    user = await db.collection("users").findOne({ email });
    if (user) throw new Error("This email is already used!");
    const encryptedPassword = await bcrypt.hash(password.toString(), 10);
    await db.collection("users").insertOne({
      name,
      username,
      email,
      password: encryptedPassword,
      profile: "/avatar.jpg",
      bio: "-",
      url: "",
      creation: new Date(),
    });
  } catch (e: any) {
    throw new Error(e.message);
  } finally {
    if (client) await client.close();
  }
};
