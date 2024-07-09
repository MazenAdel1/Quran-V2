import type { Metadata } from "next";
import "./globals.css";
import Content from "./Content";
import StoreProvider from "./StoreProvider";

export const metadata: Metadata = {
  title: "Quran",
  description: "Modern Quran APP For Reading, Learning, and Listening",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" dir="rtl" className="overflow-x-hidden">
      <StoreProvider>
        <Content>{children}</Content>
      </StoreProvider>
    </html>
  );
}
