import type { Metadata } from "next";
import { ClerkProvider } from "@clerk/nextjs";
import { Geist, Geist_Mono, Inika } from "next/font/google";
import Header from "@/components/header/header";
import "./globals.css";
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});
const inika = Inika({
  weight: "400",
  variable: "--font-inika",
  subsets: ["latin"],
});
const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Project Share",
  description:
    "Project Share is a platform for showcasing your projects to users worldwide",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${inika.variable}  h-full antialiased`}>
      <body className="min-h-full flex flex-col">
        <ClerkProvider>
          <Header className="sticky top-0 z-50 bg-[#0B0F17]" />
        </ClerkProvider>
        {children}
      </body>
    </html>
  );
}
