import { Metadata } from "next"

export const metadata: Metadata = {
  title: "Bazar Nin",
  description: "A online shopping complex",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return <main>{children}</main>
}
