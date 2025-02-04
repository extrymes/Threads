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
  // Connect to the MongoDB database
  const db = client.db(process.env.MONGODB_DATABASE);
  let user;
  // Check if username is already used
  user = await db.collection("users").findOne({ username });
  if (user) {
    await client.close();
    throw new Error("This username is already used!");
  }
  // Check if email is already used
  user = await db.collection("users").findOne({ email });
  if (user) {
    await client.close();
    throw new Error("This email is already used!");
  }
  // Encrypt the password
  const encryptedPassword = await bcrypt.hash(password.toString(), 10);
  // Create user in database
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
  // Close MongoDB connection
  await client.close();
};
