import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./layout.scss";
import Footer from "@/components/footer";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "杨大卫的个人网站",
  keywords:["杨大卫的个人网站,包含一些自治小工具，如个人简历编辑器，抽奖"],
  description: "杨大卫的个人网站,包含一些自治小工具，如个人简历编辑器，抽奖",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1"></meta>
      </head>
      <body className={inter.className}>
        {children}
        <Footer/>
      </body>
    </html>
  );
}
