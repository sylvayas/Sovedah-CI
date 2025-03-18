import type { Metadata } from "next";
import { Roboto as FontSans } from "next/font/google"
import { Lora } from "next/font/google"
import "./globals.css";
import { cn } from "@/lib/utils"


const fontSans = FontSans({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-sans",
})

const fontLora = Lora({
  subsets: ["latin"],
  variable: "--font-lora",
})

export const metadata: Metadata = {
  title: "Sovedah",
  description: "Sovedah",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={cn(
        `relative flex min-h-screen w-full flex-col justify-center 
        overflow-x-hidden scroll-smooth bg-background font-sans antialiased
        `,
        fontSans.variable,
        fontLora.variable,
      )}>{children}</body>
    </html>
  );
}
