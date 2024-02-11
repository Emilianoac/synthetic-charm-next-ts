import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "bootstrap/dist/css/bootstrap.min.css";
import "./global.css"
import ImportBsJS from "@/components/utils/ImportBsJS";
import Navbar from "@/components/Navbar";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Synthetic Charm | Artificial musician profiles",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Navbar/>
        <ImportBsJS/>
        <div className="container my-5">
          {children}
        </div>
      </body>
    </html>
  );
}
