import type { Metadata } from "next";
import { ToastContainer } from "react-toastify";
import "./globals.css";

export const metadata: Metadata = {
  title: "Threads",
  description: "Threads React Web App",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="bg-threads-gray">
        {children}
        <ToastContainer position="bottom-right" />
      </body>
    </html>
  );
}
