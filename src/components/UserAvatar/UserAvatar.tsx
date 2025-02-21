import Image from "next/image";

export default function UserAvatar({
  src,
  width,
  height,
  className,
  onClick,
  priority,
}: {
  src: string;
  width: number;
  height: number;
  className?: string;
  onClick?: () => void;
  priority?: boolean
}) {
  return (
    <Image
      src={src || "/avatar.jpg"}
      alt="Profile"
      width={width}
      height={height}
      className={`rounded-full object-cover aspect-square ${className}`}
      onClick={onClick}
      priority={priority}
      unoptimized
      onError={(e) => {
        const target = e.target as HTMLImageElement;
        target.src = "/avatar.jpg";
      }}
    />
  );
}
