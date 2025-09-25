import "./globals.css";
import type { Metadata } from "next";
import Providers from "./providers";

export const metadata: Metadata = {
  title: "Todo App",
  description: "Next.js Todo App with Supabase",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className="min-h-screen bg-gray-50 text-black"
      >
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
