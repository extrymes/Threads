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
      /**
       * Authorizes user credentials by validating email and password against database records.
       *
       * @param credentials - Object containing user email and password
       * @returns User object with id, username and email if authorized, null otherwise
       * @throws Error if user doesn't exist or password is invalid
       */
      async authorize(credentials) {
        if (!credentials) return null;
        const { email, password } = credentials;
        let client;
        try {
          client = await MongoClient.connect(
            process.env.MONGODB_CLIENT as string
          );
          const db = client.db(process.env.MONGODB_DATABASE);
          const user = await db.collection("users").findOne({ email });
          if (!user) throw new Error("This user does not exist!");
          const isValidPassword = await bcrypt.compare(password, user.password);
          if (!isValidPassword) throw new Error("The password is not valid!");
          return {
            id: user._id.toString(),
            username: user.username,
            email: user.email,
          };
        } catch (e: any) {
          throw new Error(e.message);
        } finally {
          if (client) await client.close();
        }
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
    /**
     * Enhances the JWT token by adding authenticated user information.
     * This allows accessing user data on the server-side via the token.
     *
     * @param token - The JWT token object
     * @param user - The authenticated user object
     * @returns The enhanced token with user data
     */
    async jwt({ token, user }) {
      if (user) token.user = user;
      return token;
    },
    /**
     * Enhances the session object with additional user information from the database.
     * This callback runs whenever a session is checked on the client-side.
     * It fetches the complete user data from database and merges it with the session.
     *
     * @param session - The current session object containing basic user info
     * @param token - The JWT token containing authenticated user data
     * @returns Enhanced session object with complete user data from database
     */
    async session({ session, token }) {
      if (token.user) {
        session.user = token.user;
        const { username } = session.user;
        let client;
        try {
          client = await MongoClient.connect(
            process.env.MONGODB_CLIENT as string
          );
          const db = client.db(process.env.MONGODB_DATABASE);
          const userDB = await db.collection("users").findOne({ username });
          if (userDB)
            return {
              ...session,
              user: {
                ...userDB,
                _id: userDB._id.toString(),
              },
            };
        } catch (e: any) {
          console.error("Error occurred when trying to fetch user data:", e);
        } finally {
          if (client) await client.close();
        }
      }
      return session;
    },
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
