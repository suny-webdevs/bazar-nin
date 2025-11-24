"use client"
import { SidebarProvider } from "@/components/ui/sidebar"
import { ReactNode, useState } from "react"

const CusSidebarProvider = ({ children }: { children: ReactNode }) => {
  const [open, setOpen] = useState(false)
  return (
    <SidebarProvider
      open={open}
      onOpenChange={setOpen}
    >
      {children}
    </SidebarProvider>
  )
}

export default CusSidebarProvider
