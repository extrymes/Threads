import { User } from "@/types/User";
import Image from "next/image";
import Link from "next/link";

export default function UserCard({ user }: { user: User }) {
  // Render
  return (
    <Link className="user-card" href={`/@${user.username}`}>
      {/* User avatar */}
      <div className="shrink-0">
        <Image
          src={user.profile}
          alt="User"
          width={50}
          height={50}
          className="rounded-full object-cover aspect-square"
          unoptimized
        />
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
