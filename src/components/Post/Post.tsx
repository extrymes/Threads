import moment from "moment-timezone";
import Image from "next/image";
import Link from "next/link";

export default function Post({
  post,
}: {
  post: {
    _id: string;
    content: string;
    username: string;
    profile: string;
    creation: Date;
  };
}) {
  return (
    <div className="post">
      {/* Avatar */}
      <div>
        <Image
          src={post.profile}
          alt="User"
          width={50}
          height={50}
          className="rounded-full object-cover"
        />
      </div>

      {/* Content */}
      <div className="text-white w-full">
        {/* Infos */}
        <div className="flex justify-between text-center">
          <Link href={`/@${post.username}`}>
            <b>{post.username}</b>
          </Link>
          <div className="text-sm text-threads-gray-light">
            {moment
              .utc(post.creation, "YYYY-MM-DD HH:mm:ss")
              .tz("Europe/Paris")
              .fromNow()}
          </div>
        </div>

        {/* Text */}
        <div className="mt-3 whitespace-pre-line">{post.content}</div>
      </div>
    </div>
  );
}
