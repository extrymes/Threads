import bcrypt from "bcrypt";
import { MongoClient } from "mongodb";
import NextAuth, { AuthOptions } from "next-auth";
import Credentials from "next-auth/providers/credentials";

export const authOptions: AuthOptions = {
  providers: [
    Credentials({
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials) return null;
        const { email, password } = credentials;
        // Connect to the MongoDB Cluster
        const client = await MongoClient.connect(
          process.env.MONGODB_CLIENT as string
        );
        // Connect to the MongoDB database
        const db = client.db(process.env.MONGODB_DATABASE);
        // Get user for this email
        const user = await db.collection("users").findOne({ email });
        // Close MongoDB connection
        await client.close();
        // Check if the user exists
        if (!user) throw new Error("This user does not exist!");
        // Check if the password is valid
        const isValidPassword = await bcrypt.compare(password, user.password);
        if (!isValidPassword) throw new Error("The password is not valid!");
        // Return user object
        return {
          id: user._id.toString(),
          name: user.name,
          username: user.username,
          email: user.email,
          profile: user.profile,
        };
      },
    }),
  ],
  session: {
    strategy: "jwt",
  },
  secret: process.env.NEXTAUTH_SECRET,
  pages: {
    signIn: "/login/signin",
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) token.user = user;
      return token;
    },
    async session({ session, user, token }) {
      if (token.user) session.user = token.user;
      return session;
    },
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
