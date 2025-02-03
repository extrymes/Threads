import Footer from "@/components/Footer/Footer";
import Image from "next/image";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <div className="absolute top-0 left-0 right-0 aspect-[1785/510] z-0">
        <Image
          src="/welcome.webp"
          alt="Welcome"
          fill
          priority
          className="object-contain"
        />
      </div>

      {/* Content */}
      <div className="flex-1 z-10">{children}</div>

      {/* Footer */}
      <Footer />
    </div>
  );
}
