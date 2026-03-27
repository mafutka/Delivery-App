import type { Metadata } from "next";
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
      <body>{children}</body>
    </html>
  );
}
