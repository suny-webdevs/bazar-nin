import type { Metadata } from "next"
import { Outfit, JetBrains_Mono } from "next/font/google"
import "./globals.css"

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
})

const jetBrains_Mono = JetBrains_Mono({
  variable: "--font-jet-brains-mono",
  subsets: ["latin"],
})

export const metadata: Metadata = {
  title: "Bazar Nin",
  description: "A online shopping complex",
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
    >
      <body
        className={`${outfit.variable} ${jetBrains_Mono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  )
}
