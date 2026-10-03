import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "TAO | OSINT | Digital Twin | AI",
  description:
    "TYSON Pengtao's personal technology lab exploring OSINT, digital twins, AI and engineering.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-CN">
      <body>{children}</body>
    </html>
  );
}