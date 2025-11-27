"use client"
import { UserCircle, GalleryHorizontalEnd } from "lucide-react"
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"
import { Separator } from "../ui/separator"
import { usePathname } from "next/navigation"
import Link from "next/link"

const items_1 = [
  {
    title: "Offers",
    url: "/offers",
  },
  {
    title: "Bazar Club",
    url: "/bazar-club",
  },
]

const items_2 = [
  {
    title: "Profile",
    url: "/profile",
    icon: UserCircle,
  },
  {
    title: "Products",
    url: "/products",
    icon: UserCircle,
  },
  {
    title: "Orders",
    url: "/orders",
    icon: GalleryHorizontalEnd,
  },
]

const AppSidebar = () => {
  const pathname = usePathname()

  return (
    <Sidebar className="border-none">
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {items_1.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton
                    isActive={pathname.includes(item.url)}
                    asChild
                  >
                    <Link href={item.url}>
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
        <Separator />
        <SidebarGroup>
          <SidebarGroupContent className="mt-2">
            <SidebarMenu>
              {items_2.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton
                    isActive={pathname.includes(item.url)}
                    asChild
                  >
                    <Link href={item.url}>
                      <item.icon />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  )
}

export default AppSidebar
