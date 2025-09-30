import type React from "react"
import type { Metadata } from "next"
import { Geist } from "next/font/google"
import "../styles/styles.css";

const geist = Geist({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-geist",
})

export const metadata: Metadata = {
  title: "Jeff Harris - Front End Engineer and Designer",
  description: "Front End Engineer and Designer with over 2 decades of experience.",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`${geist.variable}`}>
      <body className="font-sans antialiased">{children}</body>
    </html>
  )
}
