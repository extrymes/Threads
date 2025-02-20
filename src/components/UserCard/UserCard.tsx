import { User } from "@/types/User";
import Link from "next/link";
import UserAvatar from "../UserAvatar/UserAvatar";

export default function UserCard({ user }: { user: User }) {
  // Render
  return (
    <Link className="user-card" href={`/@${user.username}`}>
      {/* User avatar */}
      <div className="shrink-0">
        <UserAvatar src={user.profile} width={50} height={50} />
      </div>
      {/* User informations */}
      <div className="flex flex-col gap-2">
        <div className="flex gap-2">
          <b>{user.name}</b>
          <p className="text-threads-gray-light">@{user.username}</p>
        </div>
        {user.bio && <p>{user.bio}</p>}
      </div>
    </Link>
  );
}
