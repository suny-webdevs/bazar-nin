import AppHeader from "@/components/common/AppHeader"
import AppSidebar from "@/components/common/AppSidebar"
import { Toaster } from "@/components/ui/sonner"
import CusSidebarProvider from "@/lib/providers/CusSidebarProvider"
import { ThemeProvider } from "@/lib/providers/ThemeProvider"
import { Metadata } from "next"

export const metadata: Metadata = {
  title: "Bazar Nin",
  description: "A online shopping complex",
}

export default async function PublicLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
    >
      <CusSidebarProvider>
        <AppSidebar />
        <main className="w-full min-h-screen bg-card scroll-smooth">
          <AppHeader />
          <div className="container mx-auto px-2 py-5">{children}</div>
          <Toaster />
        </main>
      </CusSidebarProvider>
    </ThemeProvider>
  )
}
