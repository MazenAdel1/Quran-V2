import type { Metadata } from "next";
import "./globals.css";
import Content from "./Content";
import StoreProvider from "./StoreProvider";

export const metadata: Metadata = {
  title: "قرآن",
  description: "برنامج عصري لقراءة واستماع القرآن الكريم",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <StoreProvider>
      <Content>{children}</Content>
    </StoreProvider>
  );
}
