import type { Metadata } from "next";
import Header from "@/components/Header/Header";
import "./globals.css";



export const metadata: Metadata = {
  title: "Delivery service",
  description: "Delivery food, order food, order drinks, fast delivery, free delivery",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <Header />
        {children}</body>
    </html>
  );
}
