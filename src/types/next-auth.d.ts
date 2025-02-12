import "next-auth";
import { DefaultSession } from "next-auth";
import { DefaultJWT } from "next-auth/jwt";
import { ExtendedUser } from "./User";

declare module "next-auth" {
  interface User extends ExtendedUser {}
  interface Session extends DefaultSession {
    user: ExtendedUser;
  }
}

declare module "next-auth/jwt" {
  interface JWT extends DefaultJWT {
    user: ExtendedUser;
  }
}

